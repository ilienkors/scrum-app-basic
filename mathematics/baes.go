package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"sync"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

// ClassInfo ...
type ClassInfo struct {
	storyPoint int
	baesValue  float64
}

func classesGenerate(size int) [][]string {
	arrayOfClasses := make([][]string, size)
	loopCount := 0
	for i := 0; i < size; i++ {
		arrayOfClasses[i] = make([]string, size*10)
		for j := 0; j < size*10; j++ {
			loopCount++
			arrayOfClasses[i][j] = strconv.Itoa(loopCount) + "word"
		}
	}
	return arrayOfClasses
}

func countTotalDocuments(arrayOfClasses [][]string) int {
	numberOfDocuments := 0
	for _, class := range arrayOfClasses {
		numberOfDocuments += len(class)
	}
	return numberOfDocuments
}

func countWordInSlice(word string, slice []string) int {
	wordCounter := 0
	for _, sliceWord := range slice {
		if sliceWord == word {
			wordCounter++
		}
	}
	return wordCounter
}

func classOperation(number int, result []ClassInfo, class, documentToFind []string, dTotalNumberOfDocuments, kTotalUniqWords float64, wg *sync.WaitGroup) {
	defer wg.Done()
	dcTotalNumberOfDocuments := float64(len(class))
	firstLog := math.Log(dcTotalNumberOfDocuments / dTotalNumberOfDocuments)
	var secondLog, numerator, denominator float64
	secondLog = 0
	for _, word := range documentToFind {
		numerator = float64(countWordInSlice(word, class)) + 1
		denominator = kTotalUniqWords + float64(len(class))
		secondLog += numerator / denominator
	}

	result[number] = ClassInfo{number, firstLog + secondLog}
}

func findMax(result []ClassInfo) int {
	maxAnswer := result[0].baesValue
	answer := result[0].storyPoint
	for _, singleResult := range result {
		if singleResult.baesValue > maxAnswer {
			maxAnswer = singleResult.baesValue
			answer = singleResult.storyPoint
		}
	}
	return answer
}

type singleData struct {
	learn_id    int
	story_point string
	word        string
}

type body struct {
	Words string `json:”words”`
}

type answer struct {
	Story int `json:"story"`
}

func baes(w http.ResponseWriter, r *http.Request /*findString string*/) {
	var b body
	err := json.NewDecoder(r.Body).Decode(&b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	findString := b.Words
	print(findString)

	connStr := "user=postgres password=mysecretpassword dbname=scrum-app-basic-db sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("select * from learn")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	datas := []singleData{}

	for rows.Next() {
		sd := singleData{}
		err := rows.Scan(&sd.learn_id, &sd.story_point, &sd.word)
		if err != nil {
			fmt.Println(err)
			continue
		}
		datas = append(datas, sd)
	}

	const numberOfClasses = 20

	wg := new(sync.WaitGroup)
	wg.Add(numberOfClasses)

	documentToFind := strings.Split(findString, " ")

	arrayOfClasses := make([][]string, 0)

	for i := 0; i < numberOfClasses; i++ {
		arrayOfClasses = append(arrayOfClasses, make([]string, 0))
	}

	for _, sd := range datas {
		storyPoint, err := strconv.Atoi(sd.story_point)
		if err != nil {
			panic(err)
		}
		//println(sd.word)
		arrayOfClasses[storyPoint-1] = append(arrayOfClasses[storyPoint-1], sd.word)
	}

	dTotalNumberOfDocuments := float64(countTotalDocuments(arrayOfClasses))
	kTotalUniqWords := dTotalNumberOfDocuments

	result := make([]ClassInfo, numberOfClasses)

	//start := time.Now()
	for number, class := range arrayOfClasses {
		go classOperation(number, result, class, documentToFind, dTotalNumberOfDocuments, kTotalUniqWords, wg)
	}
	wg.Wait()
	/*fmt.Print("Finished in ", time.Since(start).Nanoseconds(), "\n")
	fmt.Println("Answer is", findMax(result)+1)*/
	a := answer{
		Story: (findMax(result) + 1),
	}
	json.NewEncoder(w).Encode(a)
}

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/baes", baes).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})

	handler := c.Handler(router)

	log.Fatal(http.ListenAndServe(":8080", handler))

}

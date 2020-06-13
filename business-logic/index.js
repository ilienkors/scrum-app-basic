const fastify = require('fastify')()

fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:mysecretpassword@localhost:5432/scrum-app-basic-db'
})

fastify.register(require('fastify-cors'))

fastify.get('/project/:uuid', async (req, reply) => {
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
        'SELECT name FROM project WHERE project_uuid=$1', [req.params.uuid],
    )
    client.release()
    return rows[0]
})

fastify.post('/project', async (req, reply) => {
    const { name } = req.body
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
        `INSERT INTO public.project(
            project_uuid, name)
            VALUES (uuid_generate_v4(), '${name}') RETURNING project_uuid;`
    )
    client.release()
    return rows[0]
})

fastify.post('/member', async (req, reply) => {
    const { name, project_uuid } = req.body
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
        `INSERT INTO public.member(
            project_uuid, name)
            VALUES ('${project_uuid}', '${name}') RETURNING member_id, name ;`
    )
    client.release()
    return rows[0]
})

fastify.get('/members/:project_uuid', async (req, reply) => {
    const { project_uuid } = req.params
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
        `SELECT member_id, name
            FROM public.member WHERE project_uuid='${project_uuid}';`
    )
    client.release()
    return rows
})

fastify.delete('/member/:member_id', async (req, reply) => {
    const { member_id } = req.params
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
        `DELETE
            FROM public.member WHERE member_id=${member_id};`
    )
    client.release()
    return rows
})

fastify.post('/task', async (req, reply) => {
    const { project_uuid, member_id, name, description, story_points, deadline } = req.body
    const client = await fastify.pg.connect()
    await client.query(
        `INSERT INTO public.task(
            project_uuid, member_id, name, description, story_points, deadline, "isActive", state)
            VALUES ('${project_uuid}', ${member_id}, '${name}', '${description}', ${story_points}, '${deadline}', false, 0);`
    )
    client.release()
    return { status: 'ok' }
})

fastify.get('/tasks/:project_uuid', async (req, reply) => {
    const { project_uuid } = req.params
    const client = await fastify.pg.connect()
    const { rows } = await client.query(
        `SELECT *
            FROM task WHERE project_uuid='${project_uuid}';`
    )
    client.release()
    return rows
})

fastify.delete('/task/:task_id', async (req, reply) => {
    const { task_id } = req.params
    const client = await fastify.pg.connect()
    await client.query(
        `DELETE
            FROM public.task WHERE task_id=${task_id};`
    )
    client.release()
    return { status: "ok" }
})

fastify.post('/task/update', async (req, reply) => {
    const { task_id, isActive } = req.body
    const client = await fastify.pg.connect()
    await client.query(
        `UPDATE public.task
            SET "isActive"=${isActive}
                WHERE task_id=${task_id};`
    )
    client.release()
    return { status: "ok" }
})

fastify.listen(5000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})

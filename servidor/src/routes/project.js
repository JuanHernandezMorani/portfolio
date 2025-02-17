const { Router } = require("express");
const { Project } = require("../db.js");
const { captureThumbnail, parseJSONFields } = require('../middleware/helper.js');
const { conn } = require('../db.js');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});

const app = Router();

app.get("/", async (req, res) => {
    try {
        let allProjects = await Project.findAll({
            order: [["id", "ASC"]],
        });

        if (!allProjects.length) {
            return res.json([]);
        }

        allProjects = allProjects.map((project) =>
            parseJSONFields(project.toJSON(), ["collaborators", "techs"])
        );

        return res.status(200).json(allProjects);
    } catch (error) {
        console.error("Error al obtener los Projects: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});


app.get('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    try {
        let project = await Project.findOne({
            where: { uuid: uuid }
        });

        if (project) {
            project = parseJSONFields(project.toJSON(), ["collaborators", "techs"]);

            return res.status(200).send(project);
        } else {
            return res.status(404).send(`Error 404: Can't find project: ${uuid}`);
        }
    } catch (error) {
        console.error(`Error al obtener el project: ${uuid}, error: `, error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.put('/:uuid', async (req, res) => {
    const t = await conn.transaction();
    try {
        const { uuid } = req.params;
        const { title, thumbnail, techs, collaborators, description, status, publicationDate } = req.body;
        var coSrc = Array.isArray(collaborators) ? JSON.stringify(collaborators) : collaborators;
        var teSrc = Array.isArray(techs) ? JSON.stringify(techs) : techs;

        let project = await Project.findOne({
            where: { uuid }
        });

        if (!project) {
            return res.status(404).send(`Error 404: Can't find project: ${uuid}`);
        }

        await project.update({ title, thumbnail, teSrc, coSrc, description, status, publicationDate }, { transaction: t });

        await t.commit();
        return res.status(200).json({ message: "Project actualizado exitosamente" });

    } catch (error) {
        await t.rollback();
        console.error("Error al actualizar el project:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.post('/', async (req, res) => {
    const t = await conn.transaction();
    try {
        const { title, link, techs, collaborators, description, status, publicationDate } = req.body;
        const collaboratorsData = Array.isArray(collaborators) ? JSON.stringify(collaborators) : collaborators;
        const techsData = Array.isArray(techs) ? JSON.stringify(techs) : techs;
        var newProject = {};

        if (!title || !link || !techs || !collaborators) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        let thumbnail = await captureThumbnail(link);

            newProject = await Project.create(
                { title, link, thumbnail, techs: techsData, collaborators: collaboratorsData, description, publicationDate, status },
                { transaction: t }
            );

        await t.commit();
        return res.status(201).json({ message: "Project creado con éxito", projectId: newProject.id });

    } catch (error) {
        await t.rollback();
        console.error("Error al crear el project: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.delete('/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
    let projectFind = Project.findOne({where: {uuid: uuid}});

    if(projectFind){
        await Project.destroy({
            where: { uuid: uuid },
        });
        res.status(200).send({ message: 'Deleting project' });
    } else {
        res.status(412).send({ message: 'Error 412: cant delete project' });
    }

    } catch (error) {
        console.error("Error al eliminar el project: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    
});

module.exports = app;
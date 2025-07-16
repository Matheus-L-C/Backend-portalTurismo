const Contact = require('../models/contacts');

exports.createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }




        // Retorna os dados com a mensagem
        const newContact = await Contact.create({ name, email, message });
        // Retorna os dados sem a senha
        const { id } = newContact;
        res.status(201).json({ id, name, email, message })
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }

}


exports.listContacts = async (_req, res) => {
    try {
        const contacts = await Contact.findAll({
            attributes: ['name', 'email', 'message', 'createdAt', 'updatedAt']
        });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
}


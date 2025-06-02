import getPool from '../../database/getPool.js';

const editHackathonService = async (id, data) => {

    const pool = await getPool();

    const { nombre, descripcion, fecha, lugar } = data; 
    
    await pool.query(

        'UPDATE hackathons SET nombre = ?, descripcion = ?, fecha = ?, lugar = ? WHERE id = ?',

        [nombre, descripcion, fecha, lugar, id]

    );

};

export default editHackathonService;
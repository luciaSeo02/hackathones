// import jwt from "jsonwebtoken";
// import { SECRET } from '../../env.js';

// const authUser = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).json({ message: "Token requerido" });
//     }
//     const token = authHeader.split(" ")[1];
//     const user = jwt.verify(token, SECRET);
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token inválido" });
//   }
// };

// export default authUser;
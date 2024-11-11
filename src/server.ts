import fastify from "fastify";
import cors from "@fastify/cors";






const server = fastify({
    logger:true,
    
});
server.register(cors,{
    origin:"*",
    methods:["GET","POST"]
})

const teams =[
    {
        id:1,
        name:"McLaren",
        base:"woking, United Kingdom",
    },
    {
        id:2,
        name:"Ferrari",
        base:"Italia"
    },
    {
        id:3,
        name:"Mercedes",
        base:"Bracley , United Kingdom"
    },
    {
        id:4,
        name:"Red Bull Racing",
        base:"Milton Keynes, United Kingdom",
    }
]

const drivers=[
    {
        id:1,
        name:"Max verstappen",
        team:"Red Bull Racing",
    },
    {
        id:2,
        name:"Lewis Hamilton",
        team:"Ferrari",
    },
    {
        id:3,
        name:"Lando Norris",
        team:"McLaren",
    },

]


server.get("/teams",async(reques,response)=>{
    response.type("application/json").code(200);
    return {teams};
});


const porta = process.env.PORT ? Number(process.env.PORT) : 3000;

server.listen({port:porta},()=>{
    console.log(`servidor inicializado na porta ${porta}`)
});

server.get("/drivers",async(request,response)=>{

    response.type("application/json").code(200);

    return[drivers]

})

interface DriverParams{
    id:string,

}

server.get<{Params:DriverParams}>("/drivers/:id",async(request,response)=>{
    const id = parseInt(request.params.id);
    const driver = drivers.find( d=>d.id === id);
    
     if(!driver){
         response.type("application/json").code(404);
         return{
            message:"Driver not found",
         }
        }else{
            response.type("application/json").code(200);
            return {driver};
        }
         
})
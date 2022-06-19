import chalk from "chalk";
import express, { response } from "express";

const app = express();
const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

app.get("/holidays",(req,res)=>{
    res.send(holidays);
});

app.get("/holidays/:mounth",(req,res)=>{
    const {mounth} = req.params; //req.params.mounth => STRING
    const holidaysMounth = holidays.filter(item =>{
        const mes = item.date.split("/" )[0];
        return parseInt(mes)===parseInt(mounth);
    });
    res.send(holidaysMounth);
});

app.get("/is-today-holiday",(req,res)=>{
    const today = new Date();
    console.log(today.toLocaleDateString("en-us"));
    const isHoliday = holidays.some((item)=>item.date===today);
    if (isHoliday){
        const feriado = holidays.find(item=>item.date===today);
        const name = feriado.name;
        res.send(`Sim, hoje é feriado de ${name}!`);
    }else{
        res.send("Não, hoje não é feriado!");
    }
});

app.listen(5000,()=>{
    console.log(chalk.bold.blue("Ok!"));
});
import Mailgen from "mailgen";
let mailGenetor = new Mailgen({
    theme:"default",
    product:{
        name:'Vsitor.com',
        link:"http://loclhost:3000"
    }
})

let response = {
    body:{
        name:"Company_user_Name",
        intro:"We Warmly welcome you to our company",
        table:{
            data:[{
                invitation:"we are  welcoming you to the coming upcoming  meeting which is going to held by this branch_name",
                stepsToFollow:"Please register by clicking the below link and also please upload ur id or ur passport",
                link:"http://localhost:3000/guest/register"
            }],
            outro:"Heartly welcomes you"
        }
    }
}

export let invitationRegisterMailFormat = mailGenetor.generate(response)
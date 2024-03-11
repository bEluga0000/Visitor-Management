import Mailgen from "mailgen";
let mailGenetor = new Mailgen({
    theme:"salted",
    product:{
        name:'Vsitor.com',
        link:"http://loclhost:3000"
    }
})

let response = {
    body: {
        name: 'John Appleseed',
        intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};

// let mailGen = new Mailgen({
//     theme:'salted',
//     product: {
//         name: 'Vsitor.com',
//         link: "http://loclhost:3000"
//     }
// })

export let invitationRegisterMailFormat = mailGenetor.generate(response)
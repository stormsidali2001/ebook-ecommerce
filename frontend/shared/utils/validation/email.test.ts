import { validateEmail } from "./email";

describe('Email validation',()=>{
    let email = '';
    test('an empty input should not be valid',()=>{
        expect(validateEmail(email)).toEqual(false);
    })
    test('it should have an @ symbole',()=>{
        email = 'sidali@gmail.com'
        expect(email.includes('@')).toEqual(true)
    })
})
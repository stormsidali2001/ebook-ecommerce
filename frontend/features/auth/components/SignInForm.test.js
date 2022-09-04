import { reducer, screen } from "../../../shared/utils/test.util";
import SignInForm from "./SignInForm";

describe('SignInForm component',()=>{
    let signInButton = null;
    beforeEach(()=>{
        reducer(<SignInForm/>)
        signInButton = screen.getByRole('button',{name: /Sign-In/i})
    })
    test('The login button  should be in the document',()=>{
        expect(signInButton).toBeInTheDocument();
    })
    test('The login button  should be initially disabled',()=>{
        expect(signInButton).toBeDisabled();
    })
})


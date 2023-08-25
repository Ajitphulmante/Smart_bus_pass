function SignIn(){
    return (
         <div id='container'>
            <form action="/signin" method="post">

                    <label>Username <input type='text' name='username' placeholder="Enter username" /> </label> <br></br>
                    <label>Password <input type='text' name='passward' placeholder="Enter passward" /> </label> <br></br>
                    <label>Phone <input type='text' name='phone' placeholder="Enter phone number" /> </label> <br></br>
                    <input type="submit" className="btn"></input>
                        <br></br>
                    
            </form>

            
         </div>
    )
}

export default SignIn;
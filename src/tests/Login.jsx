import React from 'react'

const Login = () => {
  // const loginToApp = (e) => {
  //     e.preventDefault();
  //     auth.signInWithEmailAndPassword(email, password, displayName).then((userAuth) => {
  //         dispatch(login({
  //             email: userAuth.user.email,
  //             uid: userAuth.user.uid,
  //         }))
  //     }).catch((error) => alert(error.message))
  // }

  // const register = (e) => {
  //     e.preventDefault();

  //     auth.createUserWithEmailAndPassword(email, password, displayName).then((userCredentials) => {
  //         return db.collection("Users").doc(userCredentials.user.uid).set({
  //             email: email,
  //             displayName: displayName
  //         })
  //     }).then(() => {

  //     })
  // }

  return (
    <div>
      {/* <form >
                            <span className="pb-8">
                                 <TextField
                                    className="input rounded-md p-3 focus:outline-none w-100 w-full border-2 bg-white  focus:ring-2 focus:ring-red-600 "
                                    required
                                    id="outlined-required"
                                    label="Display Name"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                /> <br />  <br />
                                <TextField
                                    className="input rounded-md p-3 focus:outline-none w-100 w-full border-2 bg-white  focus:ring-2 focus:ring-red-600 "
                                    required
                                    id="outlined-required"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /> <br />  <br />

                                <TextField
                                    className="input rounded-md p-3 focus:outline-none w-100 w-full bg-white border-2 focus:ring-2 focus:ring-red-600"
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </span><br />

                        </form> */}
      {/* 
                        <button onClick={loginToApp} className="bg-c text-white mt-8 mb-4 w-full p-3 rounded-md font-bold hover:bg-purple-900"> Login  </button>

                        <button onClick={register} disabled={!displayName || !email || !password} className="bg-c text-white  w-full p-3 rounded-md font-bold hover:bg-purple-900"> Create Account  </button> */}
    </div>
  );
}

export default Login


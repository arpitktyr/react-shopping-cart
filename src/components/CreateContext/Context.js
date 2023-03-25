import {  createContext, useContext } from "react";

const UserContext = createContext();
const user = {
  name: "Arpit Katiyar",
  email: "arpitktyr@gmail.com",
  mobile: "995626XXXX",
  dob: "12/11/XXXX",
};

export default function ContextAPIExample() {
  return (
    <UserContext.Provider value={user}>
      <center>
        <h1>{`Hello ${user.name}!`}</h1>
        <h3>{`your email is  ${user.email}!`}</h3>
        <h3>{`your mobile no. is ${user.mobile}!`}</h3>
        <h3>{`your dob is ${user.dob}!`}</h3>
        <Component2 />
      </center>
    </UserContext.Provider>
  );
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  );
}

function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user.name} again!`}</h2>
      <h3>{`your email is  ${user.email}!`}</h3>
      <h3>{`your mobile no. is ${user.mobile}!`}</h3>
      <h3>{`your dob is ${user.dob}!`}</h3>
    </>
  );
}

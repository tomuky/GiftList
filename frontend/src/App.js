import './App.css';
import axios from 'axios';
import MerkleTree from './utils/MerkleTree';
import niceList from './utils/niceList.json';
import { useEffect, useMemo, useState } from "react";

const App = () => {

  const [name,setName] = useState('');
  const [result,setResult] = useState(false);
  const [message,setMessage] = useState('');

  const merkleTree = useMemo(()=> new MerkleTree(niceList),[]);
  const serverUrl = 'http://localhost:1225';

  const onChangeHandler = (e) => setName(e.target.value);

  useEffect(()=>{
    const index = niceList.findIndex(n => n === name);
    const proof = merkleTree.getProof(index);
    if(!name){
      setMessage(``);
      setResult(false);
      return;
    }
    const fetching = async () => {
      const { data: result } = await axios.post(`${serverUrl}/gift`, {
        proof: proof,
        name: name
      });
      setResult(result);
      if(result) setMessage("You got a toy robot!");
      else setMessage("You are not on the list :(");
    }
    fetching();
  },[name,merkleTree])

  return (
    <>
      <h1>GiftList App</h1>
      <p>This is a demo app using a Merkle Tree <br/>to prove to the server if a particular <br/>name is found on the Nice List</p>
      <p>Enter a name below to see if it's on the list <br/>(Hint: try "tom")</p>
      <input onChange={onChangeHandler}></input>
      <p>{message}</p>
      {result&&<img src={require('./images/robot.png')} alt='robot'/>}
    </>
  );
}

export default App;

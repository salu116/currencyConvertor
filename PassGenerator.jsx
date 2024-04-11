import { useState, useCallback, useEffect, useRef } from 'react'

function PassGenerator() {
   const [length, setLength] = useState(8)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
        if(numAllowed) str += "1234567890";
        if(charAllowed) str += "!@#$%^&*()";
        for (let i=1; i<=length; i++){
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }
        setPassword(pass)
    },[length,numAllowed,charAllowed,setPassword])

    const copyPassword = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)

    },[password])

    useEffect(() => {
        passwordGenerator()

    },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-10 text-orange-500 bg-gray-800">
      <div className="flex justify-center text-white my-3">Password Generator</div>
       <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input 
            type="text"
            placeholder='password'
            value={password}
            className='outline-none w-full py-1 px-3'
            readOnly
            ref={passwordRef}
           
            />
            <button 
            className="outline-none bg-blue-700 text-white px-3 py0.5 shrink-0"  onClick={copyPassword}>
              Copy</button>
        </div>
         <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
                <input 
                type="range"
                value={length}
                min={5}
                max={15}
                className="cursor-pointer"
                onChange={(e) => {setLength(e.target.value)}} 
                />
                <label htmlFor="">Length: {length} </label>
            </div>
            <div className="flex items-center gap-x-1">
                <input 
                type="checkbox"
                defaultChecked = {numAllowed}
                id="numAllowed"
                onChange={() => {setNumAllowed((prev) => !prev )}}
                />
                <label htmlFor="numAllowed">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
                <input 
                type="checkbox"
                defaultChecked = {charAllowed}
                id="charAllowed"
                onChange={() => {setCharAllowed((prev) => !prev )}}
                />
                <label htmlFor="numAllowed">Characters</label>
            </div>

         </div>

    </div>
  );
}

export default PassGenerator
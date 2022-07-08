import { useState, useEffect } from 'react';
import axios from 'axios';

const Initial = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("");
    const [nationality, setNationality] = useState("");
    const [ip, setIp] = useState("")
    const [local, setLocal] = useState("")
    const [fact, setFact] = useState("")


    const handleChange = (event) => {
      setName(event.target.value)
    }
    const handleSubmit = (event) => {
      event.preventDefault();

      axios.get(`https://api.nationalize.io?name=${name}`).then((repos) => {
        setNationality(repos.data.country[0].country_id)

      });
      axios.get(`https://api.genderize.io?name=${name}`).then((repos) => {
        setGender(repos.data.gender)

      });
      axios.get(`https://api.agify.io?name=${name}`).then((repos) => {
        setTimeout(setAge(repos.data.age),100)
      });
    };

    useEffect(()=>{
      axios.get("https://catfact.ninja/fact").then((repos) => {
        setFact(repos.data.fact)
      });
      localAndIp()
    },[])
    const restart = () =>{
      setAge(0)
    }


    let localAndIp = async () =>{
      console.log("oi")
      await axios.get("https://api.ipify.org?format=json").then((repos) => {
        setIp(repos.data.ip)
      })
      axios.get(`https://ipinfo.io/${ip}/geo`).then((repos) => {
        setLocal(repos.data.city)
      })
    }

    return (
      <section className="flex flex-col w-screen h-screen">

        {
          age > 0 ?
            <div className="bg-blue-600 flex flex-col text-center flex-wrap p-44 justify-around w-full">
              <p>Probably {name} has {age} years-old.</p>
              <p>And your gender is {gender}.</p>
              <p>And your nationality is {nationality}. <a target="_blank" rel="noreferrer" href="https://www.iban.com/country-codes">Check the ID country here</a></p>
                {
                  local ?
                    <p>By the way, are you visiting {local}?</p>
                  :
                    <p>Your browser have a good security</p>
                }

                <button onClick={restart} className="w-full p-3.5 border-4 bg-green-100 rounded-3xl mt-11">Restart</button>

            </div>
          :
            <div className="w-screen h-full p-6 bg-blue-600">
              <form className=" flex flex-col justify-center text-center  w-full h-full" htmlFor="name" onSubmit={handleSubmit}>
                <label className="bg-green-100 p-2">Choice a name:</label>
                <input type="text" name="name" className="p-2 bg-green-100" value={name} onChange={handleChange} />
                <input type="submit" className="w-full p-3.5 border-4 bg-green-100 rounded-3xl mt-11"/>
              </form>
            </div>

        }
        <p className="flex-grow">{fact}</p>

      </section>
    )
}

export default Initial

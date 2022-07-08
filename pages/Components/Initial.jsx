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
      axios.get("https://api.ipify.org?format=json").then((repos) => {
        setIp(repos.data.ip)

      });
      axios.get(`https://ipinfo.io/${ip}/geo`).then((repos) => {
        setLocal(repos.data.city)

      });

    },[])
    const restart = () =>{
      setAge(0)
    }

    return (
      <section className="flex flex-col justify-around h-screen">

        {
          age > 0 ?
            <div className="bg-blue-600 flex flex-col text-center flex-wrap p-44 justify-around">
              <p>Probably {name} has {age} years-old.</p>
              <p>And your gender is {gender}.</p>
              <p>And you nationality is {nationality}. <a target="_blank" rel="noreferrer" href="https://www.iban.com/country-codes">Check the ID country here</a></p>
                {
                  local ?
                    <p>By the way, are you visiting {local}?</p>
                  :
                    <p>Your browser have a good security</p>
                }

                <button onClick={restart} className="w-1/3 p-3.5 border-4 bg-green-100 rounded-3xl m-auto mt-11">Restart</button>

            </div>
          :
            <div>
              <form className="bg-blue-600 flex flex-row flex-wrap p-44 justify-center" onSubmit={handleSubmit}>
                <label className="w-1/3 text-right bg-green-100 p-2">Choice a name:</label>
                <input type="text" name="name" className="w-1/2 p-2 bg-green-100" value={name} onChange={handleChange} />
                <input type="submit" className="w-1/3 p-3.5 border-4 bg-green-100 rounded-3xl m-auto mt-11"/>
              </form>
              {fact}
            </div>

        }

      </section>
    )
}

export default Initial

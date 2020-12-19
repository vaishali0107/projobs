import React,{useState,useEffect,createContext} from 'react'
import axios from "axios"
export default function JobComponent(props) {
    const [data,setData] = useState([])
    const [showData,setShowData] = useState(false)
    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json")
        .then(res=>{
            console.log(res);
            setData(res.data)
            
        })
        .catch(error=>{
            console.log(error);
        })
    },[] )

    const toggleButton=(event,jobid)=>{
        event.preventDefault()
        console.log(data[0].id)
        console.log(jobid)
        for(var i=0;i<data.length;i++){
            if(data[i].id===jobid){
                setShowData(!showData)
            }
        }
    }


   return (
       <div>
           {
               data.map(value=>{
                   return(
                       <>
                       <div key={value.id}>
                       <div className="title">{value.title}</div>
                                <div className="logo" >
                                <img src={value.company_logo} alt="company-logo" className="image-container" />
                                </div>
                       
                            <div className="created-at">{value.created_at}</div>
                            <div className="button-container">
                                <button className="job-button">Full Time</button>
                                <button className="job-button button2">Fully Remote</button>
                            </div>
                            <div className="content-container">
                                Please use the following link to get in touch <br />
                                <a href={value.company_url}>{value.company_url}</a>
                            </div>
                            <div>
                            {showData===true?<p>{value.description}</p>:""}
                                <button className="job-button view-button" 
                                 onClick={(event)=>{toggleButton(event,value.id)}}>view details
                                </button>
                            </div>
                        </div>
                        </>
                   )
               })
           }
       </div>
   ) 
}         

import React, { useEffect, useState } from 'react'

function Main() {

    const [inputs, setInputs] = useState({
    age: '',
    gender: '',
    dm_dur_cat: '',
    insulin: '',
    htn: '',
    bmi: '',
    hba1c: '',
    fbs_cat_new: '',
    sbp_cat: ''
  });


  const [result, setResult] = useState(null);


  const onSubmit = async event => {
    event.preventDefault();
    
    if(Number.isNaN(parseInt(inputs.age))){
      alert("Please choose an option for Age");
      return;
    }

    if(parseInt(inputs.age)<0 || parseInt(inputs.age)>100){
      alert("Age should be between 0 and 100");
      return;
    }

    if(Number.isNaN(parseInt(inputs.gender))){
      alert("Gender should be either 0 or 1");
      return;
    }
    
    if(!Number.isInteger(parseFloat(inputs.gender))){
      alert("Gender should be an Integer, not a Float.")
      return;
    }

    if(parseInt(inputs.gender)<0 || parseInt(inputs.gender)>1){
      alert("Gender should be 0 or 1");
      return;
    }

    if(Number.isNaN(parseInt(inputs.dm_dur_cat))){
      alert("Please choose an option for DM Duration Category");
      return;
    }
    if(!Number.isInteger(parseFloat(inputs.dm_dur_cat))){
      alert("DM Duration Category should be an Integer, not a Float.")
      return;
    }
    if(inputs.dm_dur_cat<0 || inputs.dm_dur_cat>3){
      alert("DM Duration Category should be between 0 and 3");
      return;
    }
    if(Number.isNaN(parseInt(inputs.insulin))){
      alert("Please choose an option for Insulin ");
      return;
    }
    
    if(Number.isNaN(parseInt(inputs.htn))){
      alert("Please choose an option for Hypertension ");
      return;
    }

    if(!Number.isInteger(parseFloat(inputs.htn))){
      alert("Hypertension should be an Integer, not a Float.")
      return;
    }

    if(inputs.htn<0||inputs.htn>2){
      alert("Hypertension should be between 0 and 2");
      return;
    }

    if(Number.isNaN(parseInt(inputs.bmi))){
      alert("Please choose an option for BMI ");
      return;
    }

    if(inputs.bmi<10||inputs.bmi>60){
      alert("BMI should be between 10 and 60");
      return;
    }

    if(Number.isNaN(parseInt(inputs.hba1c))){
      alert("Please choose an option for HBA1C ");
      return;
    }
    
    if(Number.isNaN(parseInt(inputs.fbs_cat_new))){
      alert("Please choose an option for FBS Category ");
      return;
    }
    if(!Number.isInteger(parseFloat(inputs.fbs_cat_new))){
      alert("FBS Category should be an Integer, not a Float.")
      return;
    }

    if(inputs.fbs_cat_new<0||inputs.fbs_cat_new>3){
      alert("FBS Category should be between 0 and 3");
      return;
    }
    if(Number.isNaN(parseInt(inputs.sbp_cat))){
      alert("Please choose an option for SBP Category ");
      return;
    }
    if(!Number.isInteger(parseFloat(inputs.sbp_cat))){
      alert("SBP Category should be an Integer, not a Float.")
      return;
    }

    if(inputs.sbp_cat<0||inputs.sbp_cat>5){
      alert("SBP Category should be between 0 and 5");
      return;
    }

    // console.log(JSON.stringify({
    //   age: inputs.age,
    //   gender: inputs.gender,
    //   dm_dur_cat: inputs.dm_dur_cat,
    //   insulin: inputs.insulin,
    //   htn: inputs.htn,
    //   bmi: inputs.bmi,
    //   hba1c: inputs.hba1c,
    //   fbs_cat_new: inputs.fbs_cat_new,
    //   sbp_cat: inputs.sbp_cat
    // }));
    const response = await fetch(`https://rapp-qw2lesomka-em.a.run.app/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: inputs.age,
        gender: inputs.gender,
        dm_dur_cat: inputs.dm_dur_cat,
        insulin: inputs.insulin,
        htn: inputs.htn,
        bmi: inputs.bmi,
        hba1c: inputs.hba1c,
        fbs_cat_new: inputs.fbs_cat_new,
        sbp_cat: inputs.sbp_cat
        
      })
    });
    const res = await response.json();
    setResult(res['prediction'][0]);
  
    const queryString = window.location.search;
    // console.log(queryString);
   
    const urlParams = new URLSearchParams(queryString);
    const jwt = urlParams.get('jwt');

  const response2 = await fetch(`https://ninth-bonito-377309.el.r.appspot.com//db/insert`, {
      method: 'POST',
      headers: {
        'token': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: inputs.age,
        gender: inputs.gender,
        dm_dur_cat: inputs.dm_dur_cat,
        insulin: inputs.insulin,
        htn: inputs.htn,
        bmi: inputs.bmi,
        hba1c: inputs.hba1c,
        fbs_cat_new: inputs.fbs_cat_new,
        sbp_cat: inputs.sbp_cat,
        pred: result
      })
    });


    const res2 = await response2.json();
    console.log(res2);
    // setResult(res['prediction'][0]);
  };

  return (
    <div className='bg-slate-300 flex flex-col justify-center items-center font-mono'>
        <h1 class="flex mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl" style={{padding: "10px"}}><span class="break-all flex text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-600">DR DETECTION</span></h1>


        <div className='flex flex-col w-full space-y-2' style={{padding:10, alignItems:'center'  }}>


        <div className='flex w-5/6 space-x-1  '>
            <div class='break-all shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline'>Age:</div>
            <input class="break-all shadow rounded-lg appearance-none border rounded w-2/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline " id="age" type="text" placeholder="Age must be between 0-100 years" value={inputs.age} onChange={(e) => {
                e.preventDefault();
                setInputs({...inputs, age: e.target.value});
            }}/>
        </div>

        <div className='flex w-5/6 space-x-1'>
        <label for="gender" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">Gender:</label>
        <select id="gender" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={inputs.gender} 

        onChange={(e) => {
            e.preventDefault();
            setInputs({...inputs, gender: e.target.value})
        }}
        >
            <option selected>Choose an option</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
        </select>
        </div>

        <div className='flex w-5/6 space-x-1'>
        <label for="dm_dur" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">DM Duration Category:</label>
        <select id="dm_dur" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   value={inputs.dm_dur_cat} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, dm_dur_cat: e.target.value})
}}>
            <option selected>Choose an option</option>
            <option value="0">Upto 5 years</option>
            <option value="1">6-10 years</option>
            <option value="2">More than 10 years</option>
        </select>
        </div>

        <div className='flex w-5/6 space-x-1'>
        <label for="Insulin" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">Insulin Treatment:</label>
        <select id="Insulin" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputs.insulin} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, insulin: e.target.value})
}} >
            <option selected>Choose an option</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
        </div>

        <div className='flex w-5/6 space-x-1'>
        <label for="HT" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">Hypertension History:</label>
        <select id="HT" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " value={inputs.htn} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, htn: e.target.value})
}}>
            <option selected>Choose an option</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
        </div>

        <div className='flex w-5/6 space-x-1'>
            <div class='break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline'>BMI:</div>
            <input class="break-all flex shadow rounded-lg appearance-none border rounded w-2/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline" id="bmi" type="text" placeholder="BMI must be between 10-60" value={inputs.bmi} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, bmi: e.target.value})
}}/>
        </div>

        <div className='flex w-5/6 space-x-1'>
        <label for="ghs" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">Glycosylated Haemoglobin Status:</label>
        <select id="ghs" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputs.hba1c} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, hba1c: e.target.value})
}}>
            <option selected>Choose an option</option>
            <option value="0">Normal</option>
            <option value="1">Pre-Diabetic</option>
            <option value="2">Diabetic</option>
        </select>
        </div>


        <div className='flex w-5/6 space-x-1'>
        <label for="fbs" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">Fasting Plasma Glucose:</label>
        <select id="fbs" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputs.fbs_cat_new} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, fbs_cat_new: e.target.value})
}}>
        <option selected>Choose an option</option>
            <option value="0">Normal</option>
            <option value="1">Pre-Diabetic</option>
            <option value="2">Diabetic</option>
        </select>
        </div>


        <div className='flex w-5/6 space-x-1'>
        <label for="sbp" class="break-all flex shadow rounded-lg appearance-none w-1/3 py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline">Systolic Blood Pressure Status:</label>
        <select id="sbp" class="break-all flex border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={inputs.sbp_cat} 

onChange={(e) => {
    e.preventDefault();
    setInputs({...inputs, sbp_cat: e.target.value})
}}>
            <option selected>Choose an option</option>
            <option value="0">{"<120"}</option>
            <option value="1">{"120-139"}</option>
            <option value="2">{"140-159"}</option>
            <option value="3">{"160-179"}</option>
            <option value="4">{">=180"}</option>
        </select>
        </div>
        </div>
        <div style={{padding: "20px"}}>
        <button onClick={onSubmit} class="break-all flex bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        Predict
</button>
            </div>
 
<h1 class="flex mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl " style={{padding: "25px"}}><span class="break-all flex text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-purple-600">RESULT: </span>{result===1?<span class="break-all flex text-red-600">DR POSITIVE</span>:(result===0)?<span class="break-all flex text-green-600">DR NEGATIVE</span>:""}</h1>

    </div>
  )
}

export default Main

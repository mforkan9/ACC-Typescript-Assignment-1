import React, {useEffect, useState } from 'react';

interface MealBd{
    strCategoryThumb: string | undefined;
    strCategory: string;
}
 interface searchMeal{
     strMealThumb: string | undefined;
     strMeal: string | undefined;
     strCategory: string | undefined;

 }

const Home = () => {
    const [showMeal, setShowMeal] = useState<MealBd[]>([])
    const [searchItem,setSearchItem] = useState<string>()
    const [filterData,setFilterData] = useState<searchMeal[]>([])

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(data => setShowMeal(data.categories))
    }, [])

    
    const handleSearch = () =>{
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchItem)
        .then(res => res.json())
        .then(dat => setFilterData(dat.meals))

        setShowMeal([])
    }
    return (
        <div>
           <h2>Simple TypeScript Meal Search APP</h2>
            <form className="col-md-6 m-auto py-5">
                <div className="input-group mb-3">
                    <input id="input-field" type="text" onChange={(e) => setSearchItem(e.target.value)} name='name' className="form-control" placeholder="Enter a search for Meal ..." />
                    <div className="input-group-append">
                        <button onClick={() => handleSearch()}  id="search-btn" type="button" className="btn btn-danger">Search</button>
                    </div>
                </div>
            </form>
            
            <div>
               {
                   showMeal.map((ml)=>{
                     return <div className='float-start m-5'>
                         <h5>{ml.strCategory}</h5>
                         <img src={ml.strCategoryThumb} alt="" />
                     </div>
                   })   
                }
            </div>
            <div>
                {
                    filterData.map(sm =>{
                        return <div className='float-start m-5'>
                        <h5>{sm.strMeal}</h5>
                        <img style={{height:'200px',width:'200px'}} src={sm.strMealThumb} alt="" />
                    </div>
                    })
                }
            </div>
        </div>
    );
};

export default Home;
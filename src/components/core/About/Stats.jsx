import React from 'react'

const Stat =[
    {count:"5K" , label:"Active Students"},
    {count:"10+" , label:"Mentors"},
    {count:"200+" , label:"Courses"},
    {count:"50+" , label:"Awards"}
]

const Stats = () => {
  return (
    <section>
        <div>
            <div className='flex justify-evenly gap-10 flex-wrap'>
                {
                    Stat.map((data,index)=>{
                        return (
                            <div key={index}>
                                <h1 className='text-3xl'>{data.count}</h1>
                                <h2 className=''>{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Stats
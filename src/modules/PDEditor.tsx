import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { jobInfoObj } from '../types/ExcelObjectTypes'

const PDEditor = () => {
    const fetchHook = useFetch()
    const { jobs, page, totalPages, limit } = useLoaderData() as {jobs: jobInfoObj[], page: number, totalPages: number, limit: number}
    const [itemList, setItemList] = useState(jobs)
    const [currentLevel, setCurrentLevel] = useState<string>("job")
    const [currentPage, setCurrentPage] = useState<number>(page)
    const [numOfPages, setNumOfPages] = useState<number>(totalPages)

    const retrieveData = async (pageNum: number, limitNum: number) => {
        if (pageNum < 1 || pageNum > numOfPages) 
            return

        const response = await fetchHook(`/excelInfo/job?page=${pageNum}&limit=${limitNum}`, "GET", undefined, import.meta.env.VITE_EXCELINFO)
        const data = await response.json()
        if (!response.ok) {
            console.error("Error fetching data")
            return
        }

        setCurrentPage(pageNum)
        setNumOfPages(data.totalPages)
        setItemList(data.jobs)
    }

    return (
      <>
        <div id="jobMenuScreen" style={{backgroundColor: "#f0f0f0"}}>
            <header id="jobMenuHeader" style={{justifyContent: "flex-end", minHeight: "80px"}}>
                <h4 id="logOutButtonHeader" onClick={() => console.log()}>Logout</h4>
                <nav>
                    <Link to="/creatingJob" className='jobMenuButtons'>Create Job Document</Link>
                    <Link to="/creatingJobPackage" className='jobMenuButtons'>Edit/Create Job Package</Link>
                    <Link to="/jobMenu" className='jobMenuButtons'>View Job Menu</Link>
                </nav>
            </header>
            <div id="pdBody">
              <header id="pdHeader">
                <h1>Excel Production & Delivery <span>Job<span id="lastLetter">▼</span></span></h1>
                <section id="pdFilters">
                  <div className='filterSection'>
                    <label>Customer:</label>
                    <input type="text" />
                    <label>Project:</label>
                    <input type="text" />
                    <label>Job:</label>
                    <input type="text" />
                  </div>
                  <div className='filterSection'>
                    <label>Customer ID:</label>
                    <input type="text" />
                    <label>Project ID:</label>
                    <input type="text" />
                    <label>Job ID:</label>
                    <input type="text" />
                  </div>
                </section>
              </header>
              <div id="pdTable">
                <section id="pageNavigation">
                  <button onClick={() => retrieveData(currentPage - 1, limit)}>Previous</button>
                  <h3>Page {currentPage} of {numOfPages}</h3>
                  <button onClick={() => retrieveData(currentPage + 1, limit)}>Next</button>
                </section>
                <section className='pdRow'>
                  {Object.keys(itemList[0]).map((key, index) => {
                      return (
                        <h4 key={index}>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/, letter => letter.toUpperCase())}</h4>
                      )
                    })
                  }
                </section>
                {itemList.map((job, index) => {
                    return (
                      <div className='pdRow' key={index}>
                        {Object.values(job).map((value, index) => {
                          return (
                            <input key={index} value={value instanceof Date ? value.toLocaleString() : value} />
                          )
                        })}
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
      </>
    )
}

export default PDEditor
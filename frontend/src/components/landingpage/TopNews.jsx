import React from 'react'

const TopNews = () => {
  return (
    <>
    <div className='row py-2'>
      <p className='fs-3 text-center '>Top <b className='text-mycolor'>News</b></p>
      <div className='col-sm-10 mx-auto'>
        <div className='row py-3'>
          {/* Top News Card Start */}
          <div className='col-sm-4 topnewscard'>
            <a href='#'>
            <div className="card mx-auto shadow-lg border border-0">
  <img src="/images/headline1.jpg" className="card-img-top img-fluid topnewsimg" alt="..." />
  <div className="card-body">
    <h5 className="card-title text-mycolor">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make
    </p>
    <span className="badge bg-mycolor">
      Politics
    </span><br/>
    <span className='topnewstext'>
      Posted By : <b>ABC XYZ</b>
    </span><br/>
    <span className='topnewstext'>
      Posted On : <b>01-08-2025</b>
    </span>
  </div>
</div>
</a>
          </div>
          {/* Top News Card End */}
          {/* Top News Card Start */}
          <div className='col-sm-4 topnewscard'>
            <a href='#'>
            <div className="card mx-auto shadow-lg border border-0">
  <img src="/images/headline1.jpg" className="card-img-top img-fluid topnewsimg" alt="..." />
  <div className="card-body">
    <h5 className="card-title text-mycolor">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make
    </p>
    <span className="badge bg-mycolor">
      Politics
    </span><br/>
    <span className='topnewstext'>
      Posted By : <b>ABC XYZ</b>
    </span><br/>
    <span className='topnewstext'>
      Posted On : <b>01-08-2025</b>
    </span>
  </div>
</div>
</a>
          </div>
          {/* Top News Card End */}
          {/* Top News Card Start */}
          <div className='col-sm-4 topnewscard'>
            <a href='#'>
            <div className="card mx-auto shadow-lg border border-0">
  <img src="/images/headline1.jpg" className="card-img-top img-fluid topnewsimg" alt="..." />
  <div className="card-body">
    <h5 className="card-title text-mycolor">Card title</h5>
    <p className="card-text">
      Some quick example text to build on the card title and make
    </p>
    <span className="badge bg-mycolor">
      Politics
    </span><br/>
    <span className='topnewstext'>
      Posted By : <b>ABC XYZ</b>
    </span><br/>
    <span className='topnewstext'>
      Posted On : <b>01-08-2025</b>
    </span>
  </div>
</div>
</a>
          </div>
          {/* Top News Card End */}
        </div>
      </div>
    </div>
    </>
  )
}

export default TopNews

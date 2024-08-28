function Footer() {
    
  
    return (
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div>
            <div>
              <h5>Share Our App</h5>
              <div className="input-group mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter app link"
                  
                 
                />
                <div className="input-group-append">
                  <button className="btn btn-success mx-3 w-100" >
                    Share
                  </button>
                </div>
              </div>
            </div>
            <div >
              <h5>Payment Patterns</h5>
              <div className="d-flex justify-content-end">
                <button className="btn btn-outline-light mx-2">Credit Card</button>
                <button className="btn btn-outline-light mx-2">PayPal</button>
                <button className="btn btn-outline-light mx-2">Bank Transfer</button>
                <button className="btn btn-outline-light mx-2">Cryptocurrency</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
// src/app/page.tsx (Home Page)
'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="main bg-image">
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <header className='text-center'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent border-0">
                <div className="card-body pt-5">
                  <h1 className='text-white lead fw-bold fs-1'>Welcome to the Login App</h1>
                  <p className='text-white lead'>Access your profile or sign up for a new account.</p>
                </div>
              </div>
              <hr className='d-block mx-auto w-50 my-0' />
            </div>
          </div>
        </div>
      </header>
      <section className='vh-20'>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12"></div>
            <div className="col-md-3 col-12">
              <Link href="/login" className='nav-link'>
                <div className="card bg-transparent border-0">
                  <div className="card-body">
                    <img className='img-fluid rounded-circle' src="./img/login-now.png" alt="" />
                    <p className="lead text-white text-center my-3">Login Now ..</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-12">
              <div className="card bg-transparent border-0">
                <div className="card-body">
                  <Link href="/signup" className='nav-link'>
                    <img className='img-fluid rounded-circle' src="./img/signup-now.png" alt="" />
                    <p className="lead text-white text-center my-3">Signup Now ..</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

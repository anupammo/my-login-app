// src/app/page.tsx (Home Page)
'use client';
import Link from 'next/link';
import ShootingStarsBG from "@/components/ShootingStarsBG";

export default function HomePage() {
  return (
    <div className="bg-image">
      {/* <img className='img-fluid rounded d-block mx-auto' src="./img/night-sky.svg" alt="Login Image" /> */}
      <ShootingStarsBG />
      <section className='text-white text-center py-10'>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className='lead fw-bold fs-1'>Welcome to the Login App</h1>
              <p className='lead'>Access your profile or sign up for a new account.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-12"></div>
            <div className="col-md-3 col-12">
              <Link href="/login" className='nav-link'>
                <div className="card border-0 my-4">
                  <div className="card-body">
                    <p className="lead text-white text-center my-3">Login Now</p>
                    <img className='img-fluid rounded d-block mx-auto' width={200} src="./img/login-now.png" alt="Login Image" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-12">
              <div className="card border-0 my-4">
                <div className="card-body">
                  <Link href="/signup" className='nav-link'>
                    <p className="lead text-white text-center my-3">Signup Now</p>
                    <img className='img-fluid rounded d-block mx-auto' width={200} src="./img/signup-now.png" alt="Signup Image" />
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

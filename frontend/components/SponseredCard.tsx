import Link from "next/link";
import React from "react";

const SponseredCard = ({ id, name, age, description, img }: any) => (
  <div key={id} className="card card-block card-stretch card-height">
    <div className="card-body profile-page p-0">
      <div className="profile-header-image">
        <div className="profile-info">
          <div className="d-flex  bd-highlight">
            <img
              src={img}
              alt="profile-img"
              className="profile-img img-fluid flex-fill  bd-highlight"
            />
          </div>
          <div className="user-detail  p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-start">
              <div className="profile-detail d-flex">
                <div className="user-data-block">
                  <h4>
                    <a>{name}</a>
                  </h4>
                  <h6>{age} Years Old</h6>
                  <p>{description}</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-end">
              <Link href="/" className="btn btn-primary">
                Sponser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SponseredCard;

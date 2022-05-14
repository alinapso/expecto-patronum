import Link from "next/link";
import React from "react";
import img6 from "../assets/images/page-img/profile-bg6.jpg";
import user09 from "../assets/images/user/09.jpg";

const SponseredCard = (props: any) => (
  <div className="card card-block card-stretch card-height">
    <div className="card-body profile-page p-0">
      <div className="profile-header-image">
        <div className="profile-info">
          <div className="d-flex  bd-highlight">
            <img
              src={user09.src}
              alt="profile-img"
              className="profile-img img-fluid flex-fill  bd-highlight"
            />
          </div>
          <div className="user-detail  p-4">
            <div className="d-flex flex-wrap justify-content-between align-items-start">
              <div className="profile-detail d-flex">
                <div className="user-data-block">
                  <h4>
                    <Link href="/dashboard/app/friend-profile">
                      <a>Anna Sthesia</a>
                    </Link>
                  </h4>
                  <h6>13 Years Old</h6>
                  <p>Lorem Ipsum is simply dummy text of the</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-end">
              <button type="submit" className="btn btn-primary">
                Sponser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SponseredCard;

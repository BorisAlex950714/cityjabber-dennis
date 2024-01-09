import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

import isTextMatched from "../../utils/isTextMatched";
import { AllData } from "../../features/business/restaurantReducer";

const FilterHotels = () => {
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);
  const { businessData } = useSelector((state) => state.Business);

  useEffect(() => {
    dispatch(AllData());
  }, []);

  useEffect(() => {
    if (businessData?.getAllData !== undefined) {
      setDataSource(businessData?.getAllData);
    }
  }, [businessData?.getAllData]);

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // custom navigation
  function ArrowSlick(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  return (
    <>
      {dataSource.slice(0, 8).map((item, index) => (
        <div
          className="col-xl-3 col-lg-3 col-sm-6"
          key={item?._id}
          data-aos="fade"
          data-aos-delay={index * 50}
        >
          <Link
            href={`/hotel/${item._id}`}
            className="hotelsCard -type-1 hover-inside-slider"
          >
            <div className="hotelsCard__image">
              <div className="cardImage inside-slider">
                <Slider
                  {...itemSettings}
                  arrows={true}
                  nextArrow={<ArrowSlick type="next" />}
                  prevArrow={<ArrowSlick type="prev" />}
                >
                  {item.BImage === null ? (
                    <div className="cardImage ratio ratio-1:1">
                      <div className="cardImage__content ">
                        <Image
                          width={300}
                          height={300}
                          className="rounded-4 col-12 js-lazy"
                          src={"/img/placeholder/business.png"}
                          alt={"image"}
                        />
                      </div>
                    </div>
                  ) : (
                    item.BImage.split(",").map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content ">
                          <Image
                            width={300}
                            height={300}
                            className="rounded-4 col-12 js-lazy"
                            src={slide}
                            alt={"image"}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </Slider>

                <div className="cardImage__wishlist">
                  <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                    <i className="icon-heart text-12" />
                  </button>
                </div>

                <div className="cardImage__leftBadge">
                  <div
                    className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase ${
                      isTextMatched(item?.tag, "breakfast included")
                        ? "bg-dark-1 text-white"
                        : ""
                    } ${
                      isTextMatched(item?.tag, "best seller")
                        ? "bg-blue-1 text-white"
                        : ""
                    } 
                    } ${
                      isTextMatched(item?.tag, "-25% today")
                        ? "bg-brown-1 text-white"
                        : ""
                    } 
                     ${
                       isTextMatched(item?.tag, "top rated")
                         ? "bg-yellow-1 text-dark-1"
                         : ""
                     }`}
                  >
                    {item?.tag}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex items-center mt-20">
              <div className="flex-center bg-blue-1 rounded-4 size-30 text-12 fw-600 text-white">
                {5}
              </div>
              <div className="text-14 text-dark-1 fw-500 ml-10">
                Exceptional
              </div>
              <div className="text-14 text-light-1 ml-10">{1500} reviews</div>
            </div>
            <div className="hotelsCard__content mt-10">
              <h4 className="hotelsCard__title text-dark-1 text-18 lh-16 fw-500">
                <span>{item?.BusinessName}</span>
              </h4>
              <p className="text-light-1 lh-14 text-14 mt-5">
                {item?.Address},&nbsp;&nbsp;{item?.City}
              </p>
              <div className="mt-5">
                <div className="fw-500">
                  <span className="text-light-1">{item?.MarketVariable}</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="fw-500">
                  Annual Revenue{" "}
                  <span className="text-blue-1">{item?.AnnualRevenue}</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="fw-500">
                  <span className="text-light-1">{item?.Industry}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default FilterHotels;

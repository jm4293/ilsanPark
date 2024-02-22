import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouterStore } from '../../store/zustand/router.store';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  landing_button_style,
  landing_slider_item1_style,
  landing_slider_item2_style,
  landing_slider_item3_style,
  landing_slider_item4_style,
} from '../../styles/landing/landing.style';

export const Landing = () => {
  const navigate = useNavigate();
  const BASE_URL = useRouterStore((state) => state.base_url);

  const onclickHandler = () => {
    navigate('/' + BASE_URL + '/home');
  };

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    // speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // autoplay: true,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <div css={landing_slider_item1_style}>
            <div>1</div>
          </div>
        </div>
        <div>
          <div css={landing_slider_item2_style}>
            <div>2</div>
          </div>
        </div>
        <div>
          <div css={landing_slider_item3_style}>
            <div>3</div>
          </div>
        </div>
        <div>
          <div css={landing_slider_item4_style}>
            <div>4</div>
            <button css={landing_button_style} onClick={onclickHandler}>
              시작하기
            </button>
          </div>
        </div>
      </Slider>
    </>
  );
};

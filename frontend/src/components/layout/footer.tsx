import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { IoIosWallet } from 'react-icons/io';
import { FaCar } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';

import { footer_item_style, footer_style } from '../../styles/layout/layout.style';
import { useRouterStore } from '../../store/zustand/router.store';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const BASE_URL = useRouterStore((state) => state.base_url);

  const onClickHandler = (url: string) => {
    console.log('ur', url);
    navigate('/' + BASE_URL + url);
  };

  return (
    <>
      <div css={footer_style}>
        <div css={footer_item_style} onClick={() => onClickHandler('/home')}>
          <BiSolidHome size="2rem" />
          <div>홈</div>
        </div>
        <div css={footer_item_style} onClick={() => onClickHandler('/charging')}>
          <RiBattery2ChargeFill size="2rem" />
          <div>충전소 찾기</div>
        </div>
        <div css={footer_item_style} onClick={() => onClickHandler('/wallet')}>
          <IoIosWallet size="2rem" />
          <div>카드지갑</div>
        </div>
        <div css={footer_item_style} onClick={() => onClickHandler('/mycar')}>
          <FaCar size="2rem" />
          <div>내차관리</div>
        </div>
        <div css={footer_item_style} onClick={() => onClickHandler('/setting')}>
          <BsThreeDots size="2rem" />
          <div>더보기</div>
        </div>
      </div>
    </>
  );
};

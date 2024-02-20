import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { IoIosWallet } from 'react-icons/io';
import { FaCar } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';

import { footer_item_style, footer_style } from '../../styles/layout/layout_style';

export const Footer = () => {
  return (
    <>
      <div css={footer_style}>
        <div css={footer_item_style}>
          <BiSolidHome size="2rem" />
          <div>홈</div>
        </div>
        <div css={footer_item_style}>
          <RiBattery2ChargeFill size="2rem" />
          <div>충전소 찾기</div>
        </div>
        <div css={footer_item_style}>
          <IoIosWallet size="2rem" />
          <div>카드지갑</div>
        </div>
        <div css={footer_item_style}>
          <FaCar size="2rem" />
          <div>내차관리</div>
        </div>
        <div css={footer_item_style}>
          <BsThreeDots size="2rem" />
          <div>더보기</div>
        </div>
      </div>
    </>
  );
};

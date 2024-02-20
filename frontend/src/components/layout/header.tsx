import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineBell } from 'react-icons/ai';
import { MdOutlineDarkMode } from 'react-icons/md';
import { header_style } from '../../styles/layout/layout_style';

export const Header = () => {
  return (
    <>
      <div css={header_style}>
        <div>
          <div className="d-flex justify-center g-10">
            <AiOutlineUser size="2rem" />
            <div
              css={{
                fontSize: '1.5rem',
              }}
            >
              로그인을 해주세요
            </div>
          </div>
        </div>

        <div className="d-flex g-10">
          <AiOutlineBell size="2rem" />
          <MdOutlineDarkMode size="2rem" />
        </div>
      </div>
    </>
  );
};

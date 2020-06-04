import React, {useState} from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import styled, { keyframes, css } from 'styled-components';
// @ts-ignore
import { bounce } from 'react-animations';

const bounceAnimation = keyframes`${bounce}`;

const BounceBtn = styled(Button)<{hover: boolean}>`
  ${({hover}) => hover && css`animation: 1s ${bounceAnimation};`}
`;
interface Props {
  className?: string;
  openPredPanel: () => void;
  onAnimationEnd: () => void;
}

const Title: React.FC<Props> = ({ className, openPredPanel, ...rest }) => {

  return (
    <div
      className={classnames(
        'absolute transform max-w-sm h-40 flex p-6 bg-white rounded-lg shadow-xl mx-auto inset-0 justify-center items-center text-center',
        className
      )}
      {...rest}
    >
      <FontAwesomeIcon
        className={'self-center'}
        icon={faCoffee}
        color={'orange'}
        size={'5x'}
      />
      <div className={'ml-6 pt-1'}>
        <h2 className={'text-4xl text-gray-900 text-center leading-tight'}>
          Map World
        </h2>
        {/* <Link to="/renderer"> */}
          <div className="mt-4">
            <Button
              type={'primary'}
              className={
                'hover:text-white transform hover:scale-125 hover:bg-teal-500 bg-teal-700 border border-teal-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal'
              }
              onClick={e => {
                e.stopPropagation();
                openPredPanel();
              }}
            >
              Start!
            </Button>
          </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Title;

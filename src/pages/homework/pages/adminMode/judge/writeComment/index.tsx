import { Card, ConfigProvider, Input, message } from 'antd';
import React, { ChangeEvent, HTMLAttributes, useState } from 'react';
import Submit from '../../../../components/button';
import Title from '../../../../components/title';
import './index.less';

const { TextArea } = Input;

interface WriteCommentProps {
  onCommentSubmit?: (e: string) => void;
  onValueChange?: (e: string) => void;
}
const WriteComment: React.FC<HTMLAttributes<HTMLDivElement> & WriteCommentProps> = (
  props,
) => {
  const [text, settext] = useState<string>('');
  const { onCommentSubmit, onValueChange, ...restProps } = props;
  const inputBox = document.querySelector('.write-comment-input') as HTMLInputElement;
  inputBox &&
    inputBox.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleClick();
      }
    });
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    settext(value);
    onValueChange && onValueChange(value);
  };
  const handleClick = () => {
    if (text) {
      onCommentSubmit && onCommentSubmit(text);
    } else {
      message.error('评论内容为空').then(null, null);
    }
    settext('');
  };
  return (
    <div {...restProps}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F79B2E',
          },
        }}
      >
        <Card
          title={<Title title="评语" style={{ marginLeft: 0 }}></Title>}
          className="write-comment-wrap"
        >
          <TextArea
            placeholder={'快来发表评论吧'}
            allowClear
            className={'write-comment-input '}
            style={{ resize: 'none' }}
            value={text}
            onChange={handleChange}
          ></TextArea>
          <Submit onClick={handleClick} className="write-comment-button">
            评论
          </Submit>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default WriteComment;

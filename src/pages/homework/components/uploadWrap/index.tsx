/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, CSSProperties } from 'react';
import { Card, UploadProps } from 'antd';
import InputBox from '../input';
import './index.less';
import Submit from '../button';
import DropDown from '../dropDown';
import Title from '../title';
import { root } from '../../utils/deData';
import { taskListType, choiceType, TaskInfoType } from '../../types';
import FileLink from '../files';
interface UploadSectionProps {
  title?: string;
  status?: number;
  className?: string;
  style?: CSSProperties;
  button_title?: string;
  choice: choiceType;
  taskList?: taskListType[];
  loading?: boolean;
  onSubmit?: (query: TaskInfoType) => void;
  children?: React.ReactNode;
  submitClass?: string;
  onSwitch?: (item: any) => void;
  submitDisabled?: boolean;
}
type formTitleType = {
  assignedTaskID?: string;
  title_text: string;
};

const UploadSection: React.FC<UploadSectionProps> = (props) => {
  const {
    title,
    onSwitch,
    submitClass,
    children,
    onSubmit,
    loading,
    status,
    className,
    style,
    button_title,
    choice,
    taskList,
    submitDisabled,
  } = props;
  const [formData, setformData] = useState<string[]>();
  const [defaultValue, setDefaultValue] = useState<TaskInfoType>({
    title_text: '',
    content: '',
    urls: [''],
  });
  const [formTitle, setFormTitle] = useState<formTitleType>({
    title_text: '',
    assignedTaskID: '',
  });
  const [formContent, setFormContent] = useState<string>();
  const statusList: string[] = ['未提交', '已提交', '已批阅'];
  const handleChangeTitle = (e: taskListType) => {
    if (choice.includes('edit')) {
      setFormTitle({ title_text: e.text as string, assignedTaskID: e.id });
      return;
    }
    setFormTitle({ title_text: e.text as string });
  };
  const handleSwitch = (e: TaskInfoType, id: string) => {
    if (e) {
      setDefaultValue(e);
      onSwitch && onSwitch(id);
    }
  };
  const handleChangeContent = (e: string) => {
    setFormContent(e);
  };
  const handleChangeUpload = (e: UploadProps['fileList']) => {
    const tmpList = e?.map((item) => {
      if (item?.response) return `${root}${item.response.key as string}`;
      else return `${item.url as string}`;
    });
    setformData(tmpList);
  };
  const handleSubmit = () => {
    const query: TaskInfoType = {
      ...formTitle,
      content: formContent as string,
      urls: formData as string[],
    };
    onSubmit && onSubmit(query);
  };

  return (
    <>
      <Card
        title={
          <Title
            extra={
              <>
                {typeof status != 'undefined' && (
                  <div className="upload-status">{statusList[status]}</div>
                )}
              </>
            }
            title={title}
          ></Title>
        }
        className={'upload-wrap ' + (className as string)}
        style={style}
        loading={loading}
      >
        <div className="upload-upload">
          {choice.includes('new') ? (
            <InputBox
              defaultValue={[defaultValue.title_text]}
              label="标题"
              type="input"
              className="inp more"
              limit={30}
              onChange={(str) => handleChangeTitle({ id: '', text: str as string })}
            ></InputBox>
          ) : (
            <DropDown
              type={choice.includes('user') ? 'user' : 'admin'}
              onSwitch={handleSwitch}
              data={taskList as taskListType[]}
              onChoose={(e) => handleChangeTitle(e)}
            ></DropDown>
          )}
          <InputBox
            label="内容简介"
            type="textarea"
            className="inp"
            limit={500}
            defaultValue={[defaultValue.content]}
            onChange={(str) => handleChangeContent(str as string)}
            disabled={choice.includes('user') ? true : false}
          ></InputBox>
          {!choice.includes('user') ? (
            <InputBox
              label="附件"
              type="file"
              className="inp"
              onChange={(files) => handleChangeUpload(files as UploadProps['fileList'])}
              defaultValue={defaultValue.urls}
              disabled={choice.includes('user') ? true : false}
            ></InputBox>
          ) : (
            <FileLink className="inp" data={defaultValue.urls}></FileLink>
          )}
          {children}
          <Submit
            className={`submit-page  ${submitClass as string}`}
            onClick={handleSubmit}
            disabled={submitDisabled ? submitDisabled : false}
          >
            {button_title}
          </Submit>
        </div>
      </Card>
    </>
  );
};

export default UploadSection;

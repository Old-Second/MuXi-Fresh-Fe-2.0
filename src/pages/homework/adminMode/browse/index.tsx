import React, { useState } from 'react';
import './index.less';
import Form from '../../components/pages/table';
import Selector from '../../components/pages/selector';
import { defData } from '../../utils/deData';
import { dataType, taskListType } from '../../types';
import { get } from '../../../../services/fetch';
import { Collapse, CollapseProps } from 'antd';

const HomeworkBrowse: React.FC = () => {
  const [taskList, setTaskList] = useState<CollapseProps['items']>([]);
  const handleChange = (item: dataType): void => {
    get(`/task/assigned/list?group=${item.value}`).then((res) => {
      const Res = res.data.titles as taskListType[];
      if (Res) {
        const tasks: CollapseProps['items'] = Res.map((itm) => {
          return {
            key: itm.id,
            label: itm.text,
            children: <Form task_id={itm.id} group={item.value}></Form>,
          };
        });
        setTaskList(tasks.reverse() as CollapseProps['items']);
      }
    });
  };
  return (
    <div className="browse-wrap">
      <Selector
        title="选择组别"
        data={defData}
        onChange={(item) => handleChange(item as dataType)}
        className="browse-selector"
      ></Selector>
      <Collapse bordered={false} items={taskList} className="browse-collapse"></Collapse>
    </div>
  );
};

export default HomeworkBrowse;

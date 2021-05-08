import React from 'react';
import PropTypes from 'prop-types';

import './treeView.css';

function TreeView(props) {
  const toggleExpand = (event) => {
    const currentTarget = event.currentTarget;
    const nodeId = currentTarget.dataset.id;

    if (currentTarget.classList.contains('expanded')) {
      currentTarget.classList.remove('expanded');
    } else {
      currentTarget.classList.add('expanded');
    }
    const cList = document.querySelector(`#child-${nodeId}`).classList;
    if (cList.contains('hidden')) {
      cList.remove('hidden');
    } else {
      cList.add('hidden');
    }
  };

  const getNodes = (data, level, TreeNode) => {
    let nodes = [];
    for (let i = 0; i < data.length; i++) {
      const { children, ...restParams } = data[i];
      if ((children && children.length === 0) || !children) {
        nodes.push(<TreeNode key={restParams.id} data={restParams} level={level} />);
      } else {
        const childNodes = getNodes(children, level + 1, TreeNode);
        nodes = nodes.concat([
          <div key={`parent-${restParams.id}`}>
            <div className="parentWrapper expanded" data-id={restParams.id} onClick={toggleExpand}>
              <TreeNode key={restParams.id} data={restParams} hasChildren />
            </div>
            <div className="childContainer" id={`child-${restParams.id}`} key={`child-${restParams.id}`}>
              {[...childNodes]}
            </div>
          </div>
        ]);
      }
    }
    return nodes;
  };

  return <div className="treeView">{getNodes(props.data, 0, props.treeNode)}</div>;
}

TreeView.propTypes = {
  treeNode: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default TreeView;

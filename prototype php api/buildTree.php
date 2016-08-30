<?php

function buildTree(array &$elements, $parentId = 0) {

    $branch = array();

    foreach ($elements as &$element) {

        if ($element['parentID'] == $parentId) {
            $children = buildTree($elements, $element['nodeID']);
            if ($children) {
                $element['children'] = $children;
            }
            $branch[$element['nodeID']] = $element;
            unset($element);
        }
    }
    return $branch;
}
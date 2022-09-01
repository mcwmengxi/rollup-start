// src/main.js
import foo from './foo.js';
import {version} from '../package.json';
import _ from 'lodash'
import './test.css'
import './example'

export default function main() {
  console.log(foo);
  console.log(version);
  console.log(_.join(['a', 'b', 'c'], '~'));
}
main()
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: [
    './child.component.scss',
  ]
})

export class ChildComponent {

}

/**
 npm install --save font-awesome
 angular.json:
 "styles": [   
    "node_modules/font-awesome/css/font-awesome.min.css"
],

 */
import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        <img class="navbar-logo" src="assets/img/logo_vertical.png">
                    </a>
                </div>
                <div>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a><i class="glyphicon glyphicon-user"></i> สวัสดี ธนนันท์</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-outlet></router-outlet>
    `,
    styles: [`
        .navbar-default {
            background-color: #ffffff;
        }
        .navbar-logo {
            height: 100%;
        }
        .navbar-nav li a{
            font-size: 16px;
            color: #000000;
        }
    `
    ]
})
export class AppComponentWithNav {}
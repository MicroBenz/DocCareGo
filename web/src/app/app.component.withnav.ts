import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `
        <nav class="navbar navbar-default">
            <div class="container web-brand">
                <div class="navbar-header">
                    <a class="navbar-brand">
                        <img class="navbar-logo" src="assets/img/logo_vertical.png">
                    </a>
                </div>
                <div class="user-manage">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a [popover]="myPopover"><i class="glyphicon glyphicon-user"></i> สวัสดี ธนนันท์</a>
                            <popover-content #myPopover
            title="this header can be omitted"
            [closeOnClickOutside]="true">
            <b>Very</b> <span style="color: #C21F39">Dynamic</span> <span style="color: #00b3ee">Reusable</span>
            <b><i><span style="color: #ffc520">Popover With</span></i></b> <small>Html support</small>.
            Click outside of this popover and it will be dismissed automatically.
        </popover-content>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="apps-menu">
                    <a class="active">นัดแพทย์</a>
                    <a>ดูการนัดหมาย</a>
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
        .web-brand {
            height: 65px;
        }
        .web-brand .navbar-header, .web-brand .navbar-header a, .user-manage, .user-manage ul, .user-manage a{
            height: 100%;
        }
        .user-manage a {
            line-height: 65px;
            padding: 0;
        }
        .apps-menu {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .apps-menu a{
            cursor: pointer;
            text-decoration: none;
            color: #000000;
        }
        .apps-menu a:hover, .apps-menu .active {
            color: #00a250;
        }
    `
    ]
})
export class AppComponentWithNav {}
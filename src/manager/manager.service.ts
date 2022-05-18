import { Injectable } from '@nestjs/common';
import { spawn } from "child_process";
import { writeFileSync, readFileSync } from 'fs';

//const fs = require("fs");
import { Buffer } from 'buffer';

@Injectable()
export class ManagerService {
    
    async suricata_on_off(status: number){
        if (status == 0 ){
            spawn("service", ["suricata", "stop"]);
            console.log("stop suricata");
        }
        else{
            spawn("service", ["suricata", "start"]);
            console.log("start suricata");
        }
    }
    async suricata_update(status: number){
        
        spawn("suricata-update");
        console.log("suricata update");
        
    }
    
    async protocol_on_off(id: string){
        let settings = readFileSync('/etc/suricata/suricata_1.yaml', 'utf8');
        const param_yes = `    ${id}:\n      enabled: yes`
        const param_no = `    ${id}:\n      enabled: no`
        let data;
        if (settings.search(param_yes) == -1) {
            if (settings.search(param_no) != -1) {
                settings = settings.replace(param_no, param_yes );
                console.log("замена no на yes ");
                data = new Uint8Array(Buffer.from(settings));
                writeFileSync("/etc/suricata/suricata_1.yaml", data);
                spawn("service", ["suricata", "restart"]);
            } else {
                console.log("i have not yes/no");
            }
        } else {
            console.log("замена yes на no");
            settings = settings.replace(param_yes, param_no );
            data = new Uint8Array(Buffer.from(settings));
            writeFileSync("/etc/suricata/suricata_1.yaml", data);
            spawn("service", ["suricata", "restart"]);
        }
        console.log("http");
        
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/app/config/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TechnicalSupportService {
    constructor(private http: HttpClient) { }
    private url = environment.domain
    saveReport(data: any) {
        console.log(data);
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Basic cGhhdWNhdTIzMTFAZ21haWwuY29tOkFUQVRUM3hGZkdGMGw5VTY2WlpHWUJDNG50VTI0Y240VlJfODhsUTBmZElUWTlMQTBRU2F2RmNIeUh4R1BlVktMSkxXX2haVndHa1ZrRkgxMUtpM0pUeGVWaURTeUkzZFNPMnhpejYzWXJRMm81VmhCeldKYzNVNGJ4UUpqQUl3eEcxbERvTlhpc2lyeDdVU1dCZjJDMFJWdk9Qclp0UHhZNG5jNEYwVFJGUkNkT3dJR19WdmRZTT1FMTMzMjhDNw==',
        //     'X-Atlassian-Token': 'no-check' // hoặc giá trị phù hợp nếu có
        //   };
        // const body = {
        //     "fields": {
        //         "project": { "key": "TEAM" },
        //         "summary": "Issue có ảnh minh họa",
        //         "issuetype": { "name": "Task" },
        //         "description": {
        //             "type": "doc",
        //             "version": 1,
        //             "content": [
        //                 {
        //                     "type": "paragraph",
        //                     "content": [
        //                         { "type": "text", "text": data.description }
        //                     ]
        //                 }
        //             ]
        //         },
        //         "priority": { "name": data.priority },
        //         "labels": [data.labels]
        //     }
        // }
        // return this.http.post('https://phinguyentienphat.atlassian.net/rest/api/3/issue', data);
        const response = this.http.post(`${this.url}/report-jira`, data);

        return response
    }
    uploadAttachment(issueKey: string,formData: FormData) {
        return this.http.post(`${this.url}/report-jira/attachment?issueKey=${issueKey}`, formData);
    }
}
import { ServerSateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class FetchSearchBarAction extends ServerSateUtils<SearchBar.State>{
    async fetSearchData(query:string){
        const res=await this.handleAsync("fetSearchData",()=>this.fetSearchData(query));
        if(res){
            console.log("Responsible man",query);
            const {data}=res;
            this.mutateState((p)=>{
                p.searchedData=data
            })
        }
    }
}
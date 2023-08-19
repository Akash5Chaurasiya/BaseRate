import { ServerSateUtils } from "@src/modules/StateManagement/Core/StateUtils";

export default class FetchSearchBarAction extends ServerSateUtils<SearchBar.State>{
    async fetSearchData(query:string){
        const res=await this.handleAsync("fetchSearchData",()=>this.fetSearchData(query));
        if(res){
            const {data}=res;
            this.mutateState((p)=>{
                p.searchedData=data
            })
        }
    }
}
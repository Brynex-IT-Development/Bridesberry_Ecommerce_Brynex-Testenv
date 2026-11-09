import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShippingWebhookLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ShippingWebhookLogPayload>;
export type AggregateShippingWebhookLog = {
    _count: ShippingWebhookLogCountAggregateOutputType | null;
    _min: ShippingWebhookLogMinAggregateOutputType | null;
    _max: ShippingWebhookLogMaxAggregateOutputType | null;
};
export type ShippingWebhookLogMinAggregateOutputType = {
    id: string | null;
    eventId: string | null;
    event: string | null;
    payload: string | null;
    processed: boolean | null;
    error: string | null;
    receivedAt: Date | null;
    createdAt: Date | null;
};
export type ShippingWebhookLogMaxAggregateOutputType = {
    id: string | null;
    eventId: string | null;
    event: string | null;
    payload: string | null;
    processed: boolean | null;
    error: string | null;
    receivedAt: Date | null;
    createdAt: Date | null;
};
export type ShippingWebhookLogCountAggregateOutputType = {
    id: number;
    eventId: number;
    event: number;
    payload: number;
    processed: number;
    error: number;
    receivedAt: number;
    createdAt: number;
    _all: number;
};
export type ShippingWebhookLogMinAggregateInputType = {
    id?: true;
    eventId?: true;
    event?: true;
    payload?: true;
    processed?: true;
    error?: true;
    receivedAt?: true;
    createdAt?: true;
};
export type ShippingWebhookLogMaxAggregateInputType = {
    id?: true;
    eventId?: true;
    event?: true;
    payload?: true;
    processed?: true;
    error?: true;
    receivedAt?: true;
    createdAt?: true;
};
export type ShippingWebhookLogCountAggregateInputType = {
    id?: true;
    eventId?: true;
    event?: true;
    payload?: true;
    processed?: true;
    error?: true;
    receivedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type ShippingWebhookLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShippingWebhookLogWhereInput;
    orderBy?: Prisma.ShippingWebhookLogOrderByWithRelationInput | Prisma.ShippingWebhookLogOrderByWithRelationInput[];
    cursor?: Prisma.ShippingWebhookLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShippingWebhookLogCountAggregateInputType;
    _min?: ShippingWebhookLogMinAggregateInputType;
    _max?: ShippingWebhookLogMaxAggregateInputType;
};
export type GetShippingWebhookLogAggregateType<T extends ShippingWebhookLogAggregateArgs> = {
    [P in keyof T & keyof AggregateShippingWebhookLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShippingWebhookLog[P]> : Prisma.GetScalarType<T[P], AggregateShippingWebhookLog[P]>;
};
export type ShippingWebhookLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShippingWebhookLogWhereInput;
    orderBy?: Prisma.ShippingWebhookLogOrderByWithAggregationInput | Prisma.ShippingWebhookLogOrderByWithAggregationInput[];
    by: Prisma.ShippingWebhookLogScalarFieldEnum[] | Prisma.ShippingWebhookLogScalarFieldEnum;
    having?: Prisma.ShippingWebhookLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShippingWebhookLogCountAggregateInputType | true;
    _min?: ShippingWebhookLogMinAggregateInputType;
    _max?: ShippingWebhookLogMaxAggregateInputType;
};
export type ShippingWebhookLogGroupByOutputType = {
    id: string;
    eventId: string | null;
    event: string | null;
    payload: string;
    processed: boolean;
    error: string | null;
    receivedAt: Date;
    createdAt: Date;
    _count: ShippingWebhookLogCountAggregateOutputType | null;
    _min: ShippingWebhookLogMinAggregateOutputType | null;
    _max: ShippingWebhookLogMaxAggregateOutputType | null;
};
export type GetShippingWebhookLogGroupByPayload<T extends ShippingWebhookLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShippingWebhookLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShippingWebhookLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShippingWebhookLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShippingWebhookLogGroupByOutputType[P]>;
}>>;
export type ShippingWebhookLogWhereInput = {
    AND?: Prisma.ShippingWebhookLogWhereInput | Prisma.ShippingWebhookLogWhereInput[];
    OR?: Prisma.ShippingWebhookLogWhereInput[];
    NOT?: Prisma.ShippingWebhookLogWhereInput | Prisma.ShippingWebhookLogWhereInput[];
    id?: Prisma.StringFilter<"ShippingWebhookLog"> | string;
    eventId?: Prisma.StringNullableFilter<"ShippingWebhookLog"> | string | null;
    event?: Prisma.StringNullableFilter<"ShippingWebhookLog"> | string | null;
    payload?: Prisma.StringFilter<"ShippingWebhookLog"> | string;
    processed?: Prisma.BoolFilter<"ShippingWebhookLog"> | boolean;
    error?: Prisma.StringNullableFilter<"ShippingWebhookLog"> | string | null;
    receivedAt?: Prisma.DateTimeFilter<"ShippingWebhookLog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ShippingWebhookLog"> | Date | string;
};
export type ShippingWebhookLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrderInput | Prisma.SortOrder;
    event?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShippingWebhookLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ShippingWebhookLogWhereInput | Prisma.ShippingWebhookLogWhereInput[];
    OR?: Prisma.ShippingWebhookLogWhereInput[];
    NOT?: Prisma.ShippingWebhookLogWhereInput | Prisma.ShippingWebhookLogWhereInput[];
    eventId?: Prisma.StringNullableFilter<"ShippingWebhookLog"> | string | null;
    event?: Prisma.StringNullableFilter<"ShippingWebhookLog"> | string | null;
    payload?: Prisma.StringFilter<"ShippingWebhookLog"> | string;
    processed?: Prisma.BoolFilter<"ShippingWebhookLog"> | boolean;
    error?: Prisma.StringNullableFilter<"ShippingWebhookLog"> | string | null;
    receivedAt?: Prisma.DateTimeFilter<"ShippingWebhookLog"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ShippingWebhookLog"> | Date | string;
}, "id">;
export type ShippingWebhookLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrderInput | Prisma.SortOrder;
    event?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShippingWebhookLogCountOrderByAggregateInput;
    _max?: Prisma.ShippingWebhookLogMaxOrderByAggregateInput;
    _min?: Prisma.ShippingWebhookLogMinOrderByAggregateInput;
};
export type ShippingWebhookLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShippingWebhookLogScalarWhereWithAggregatesInput | Prisma.ShippingWebhookLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShippingWebhookLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShippingWebhookLogScalarWhereWithAggregatesInput | Prisma.ShippingWebhookLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ShippingWebhookLog"> | string;
    eventId?: Prisma.StringNullableWithAggregatesFilter<"ShippingWebhookLog"> | string | null;
    event?: Prisma.StringNullableWithAggregatesFilter<"ShippingWebhookLog"> | string | null;
    payload?: Prisma.StringWithAggregatesFilter<"ShippingWebhookLog"> | string;
    processed?: Prisma.BoolWithAggregatesFilter<"ShippingWebhookLog"> | boolean;
    error?: Prisma.StringNullableWithAggregatesFilter<"ShippingWebhookLog"> | string | null;
    receivedAt?: Prisma.DateTimeWithAggregatesFilter<"ShippingWebhookLog"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShippingWebhookLog"> | Date | string;
};
export type ShippingWebhookLogCreateInput = {
    id?: string;
    eventId?: string | null;
    event?: string | null;
    payload: string;
    processed?: boolean;
    error?: string | null;
    receivedAt?: Date | string;
    createdAt?: Date | string;
};
export type ShippingWebhookLogUncheckedCreateInput = {
    id?: string;
    eventId?: string | null;
    event?: string | null;
    payload: string;
    processed?: boolean;
    error?: string | null;
    receivedAt?: Date | string;
    createdAt?: Date | string;
};
export type ShippingWebhookLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    event?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShippingWebhookLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    event?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShippingWebhookLogCreateManyInput = {
    id?: string;
    eventId?: string | null;
    event?: string | null;
    payload: string;
    processed?: boolean;
    error?: string | null;
    receivedAt?: Date | string;
    createdAt?: Date | string;
};
export type ShippingWebhookLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    event?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShippingWebhookLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    event?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    receivedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShippingWebhookLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShippingWebhookLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShippingWebhookLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    receivedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShippingWebhookLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    event?: boolean;
    payload?: boolean;
    processed?: boolean;
    error?: boolean;
    receivedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["shippingWebhookLog"]>;
export type ShippingWebhookLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    event?: boolean;
    payload?: boolean;
    processed?: boolean;
    error?: boolean;
    receivedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["shippingWebhookLog"]>;
export type ShippingWebhookLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    event?: boolean;
    payload?: boolean;
    processed?: boolean;
    error?: boolean;
    receivedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["shippingWebhookLog"]>;
export type ShippingWebhookLogSelectScalar = {
    id?: boolean;
    eventId?: boolean;
    event?: boolean;
    payload?: boolean;
    processed?: boolean;
    error?: boolean;
    receivedAt?: boolean;
    createdAt?: boolean;
};
export type ShippingWebhookLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "eventId" | "event" | "payload" | "processed" | "error" | "receivedAt" | "createdAt", ExtArgs["result"]["shippingWebhookLog"]>;
export type $ShippingWebhookLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShippingWebhookLog";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        eventId: string | null;
        event: string | null;
        payload: string;
        processed: boolean;
        error: string | null;
        receivedAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["shippingWebhookLog"]>;
    composites: {};
};
export type ShippingWebhookLogGetPayload<S extends boolean | null | undefined | ShippingWebhookLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload, S>;
export type ShippingWebhookLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShippingWebhookLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShippingWebhookLogCountAggregateInputType | true;
};
export interface ShippingWebhookLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShippingWebhookLog'];
        meta: {
            name: 'ShippingWebhookLog';
        };
    };
    findUnique<T extends ShippingWebhookLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShippingWebhookLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShippingWebhookLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ShippingWebhookLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShippingWebhookLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShippingWebhookLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShippingWebhookLogFindManyArgs>(args?: Prisma.SelectSubset<T, ShippingWebhookLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShippingWebhookLogCreateArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogCreateArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShippingWebhookLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ShippingWebhookLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShippingWebhookLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShippingWebhookLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShippingWebhookLogDeleteArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShippingWebhookLogUpdateArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShippingWebhookLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShippingWebhookLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShippingWebhookLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShippingWebhookLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShippingWebhookLogUpsertArgs>(args: Prisma.SelectSubset<T, ShippingWebhookLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ShippingWebhookLogClient<runtime.Types.Result.GetResult<Prisma.$ShippingWebhookLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShippingWebhookLogCountArgs>(args?: Prisma.Subset<T, ShippingWebhookLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShippingWebhookLogCountAggregateOutputType> : number>;
    aggregate<T extends ShippingWebhookLogAggregateArgs>(args: Prisma.Subset<T, ShippingWebhookLogAggregateArgs>): Prisma.PrismaPromise<GetShippingWebhookLogAggregateType<T>>;
    groupBy<T extends ShippingWebhookLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShippingWebhookLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ShippingWebhookLogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShippingWebhookLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShippingWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShippingWebhookLogFieldRefs;
}
export interface Prisma__ShippingWebhookLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShippingWebhookLogFieldRefs {
    readonly id: Prisma.FieldRef<"ShippingWebhookLog", 'String'>;
    readonly eventId: Prisma.FieldRef<"ShippingWebhookLog", 'String'>;
    readonly event: Prisma.FieldRef<"ShippingWebhookLog", 'String'>;
    readonly payload: Prisma.FieldRef<"ShippingWebhookLog", 'String'>;
    readonly processed: Prisma.FieldRef<"ShippingWebhookLog", 'Boolean'>;
    readonly error: Prisma.FieldRef<"ShippingWebhookLog", 'String'>;
    readonly receivedAt: Prisma.FieldRef<"ShippingWebhookLog", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ShippingWebhookLog", 'DateTime'>;
}
export type ShippingWebhookLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where: Prisma.ShippingWebhookLogWhereUniqueInput;
};
export type ShippingWebhookLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where: Prisma.ShippingWebhookLogWhereUniqueInput;
};
export type ShippingWebhookLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where?: Prisma.ShippingWebhookLogWhereInput;
    orderBy?: Prisma.ShippingWebhookLogOrderByWithRelationInput | Prisma.ShippingWebhookLogOrderByWithRelationInput[];
    cursor?: Prisma.ShippingWebhookLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShippingWebhookLogScalarFieldEnum | Prisma.ShippingWebhookLogScalarFieldEnum[];
};
export type ShippingWebhookLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where?: Prisma.ShippingWebhookLogWhereInput;
    orderBy?: Prisma.ShippingWebhookLogOrderByWithRelationInput | Prisma.ShippingWebhookLogOrderByWithRelationInput[];
    cursor?: Prisma.ShippingWebhookLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShippingWebhookLogScalarFieldEnum | Prisma.ShippingWebhookLogScalarFieldEnum[];
};
export type ShippingWebhookLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where?: Prisma.ShippingWebhookLogWhereInput;
    orderBy?: Prisma.ShippingWebhookLogOrderByWithRelationInput | Prisma.ShippingWebhookLogOrderByWithRelationInput[];
    cursor?: Prisma.ShippingWebhookLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShippingWebhookLogScalarFieldEnum | Prisma.ShippingWebhookLogScalarFieldEnum[];
};
export type ShippingWebhookLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShippingWebhookLogCreateInput, Prisma.ShippingWebhookLogUncheckedCreateInput>;
};
export type ShippingWebhookLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShippingWebhookLogCreateManyInput | Prisma.ShippingWebhookLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShippingWebhookLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    data: Prisma.ShippingWebhookLogCreateManyInput | Prisma.ShippingWebhookLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShippingWebhookLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShippingWebhookLogUpdateInput, Prisma.ShippingWebhookLogUncheckedUpdateInput>;
    where: Prisma.ShippingWebhookLogWhereUniqueInput;
};
export type ShippingWebhookLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShippingWebhookLogUpdateManyMutationInput, Prisma.ShippingWebhookLogUncheckedUpdateManyInput>;
    where?: Prisma.ShippingWebhookLogWhereInput;
    limit?: number;
};
export type ShippingWebhookLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShippingWebhookLogUpdateManyMutationInput, Prisma.ShippingWebhookLogUncheckedUpdateManyInput>;
    where?: Prisma.ShippingWebhookLogWhereInput;
    limit?: number;
};
export type ShippingWebhookLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where: Prisma.ShippingWebhookLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShippingWebhookLogCreateInput, Prisma.ShippingWebhookLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShippingWebhookLogUpdateInput, Prisma.ShippingWebhookLogUncheckedUpdateInput>;
};
export type ShippingWebhookLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
    where: Prisma.ShippingWebhookLogWhereUniqueInput;
};
export type ShippingWebhookLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShippingWebhookLogWhereInput;
    limit?: number;
};
export type ShippingWebhookLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShippingWebhookLogSelect<ExtArgs> | null;
    omit?: Prisma.ShippingWebhookLogOmit<ExtArgs> | null;
};

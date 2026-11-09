import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShipmentLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ShipmentLogPayload>;
export type AggregateShipmentLog = {
    _count: ShipmentLogCountAggregateOutputType | null;
    _min: ShipmentLogMinAggregateOutputType | null;
    _max: ShipmentLogMaxAggregateOutputType | null;
};
export type ShipmentLogMinAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    action: string | null;
    performedBy: string | null;
    remarks: string | null;
    createdAt: Date | null;
};
export type ShipmentLogMaxAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    action: string | null;
    performedBy: string | null;
    remarks: string | null;
    createdAt: Date | null;
};
export type ShipmentLogCountAggregateOutputType = {
    id: number;
    shipmentId: number;
    action: number;
    performedBy: number;
    remarks: number;
    payload: number;
    createdAt: number;
    _all: number;
};
export type ShipmentLogMinAggregateInputType = {
    id?: true;
    shipmentId?: true;
    action?: true;
    performedBy?: true;
    remarks?: true;
    createdAt?: true;
};
export type ShipmentLogMaxAggregateInputType = {
    id?: true;
    shipmentId?: true;
    action?: true;
    performedBy?: true;
    remarks?: true;
    createdAt?: true;
};
export type ShipmentLogCountAggregateInputType = {
    id?: true;
    shipmentId?: true;
    action?: true;
    performedBy?: true;
    remarks?: true;
    payload?: true;
    createdAt?: true;
    _all?: true;
};
export type ShipmentLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentLogWhereInput;
    orderBy?: Prisma.ShipmentLogOrderByWithRelationInput | Prisma.ShipmentLogOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShipmentLogCountAggregateInputType;
    _min?: ShipmentLogMinAggregateInputType;
    _max?: ShipmentLogMaxAggregateInputType;
};
export type GetShipmentLogAggregateType<T extends ShipmentLogAggregateArgs> = {
    [P in keyof T & keyof AggregateShipmentLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShipmentLog[P]> : Prisma.GetScalarType<T[P], AggregateShipmentLog[P]>;
};
export type ShipmentLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentLogWhereInput;
    orderBy?: Prisma.ShipmentLogOrderByWithAggregationInput | Prisma.ShipmentLogOrderByWithAggregationInput[];
    by: Prisma.ShipmentLogScalarFieldEnum[] | Prisma.ShipmentLogScalarFieldEnum;
    having?: Prisma.ShipmentLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShipmentLogCountAggregateInputType | true;
    _min?: ShipmentLogMinAggregateInputType;
    _max?: ShipmentLogMaxAggregateInputType;
};
export type ShipmentLogGroupByOutputType = {
    id: string;
    shipmentId: string;
    action: string;
    performedBy: string;
    remarks: string | null;
    payload: runtime.JsonValue | null;
    createdAt: Date;
    _count: ShipmentLogCountAggregateOutputType | null;
    _min: ShipmentLogMinAggregateOutputType | null;
    _max: ShipmentLogMaxAggregateOutputType | null;
};
export type GetShipmentLogGroupByPayload<T extends ShipmentLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShipmentLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShipmentLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShipmentLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShipmentLogGroupByOutputType[P]>;
}>>;
export type ShipmentLogWhereInput = {
    AND?: Prisma.ShipmentLogWhereInput | Prisma.ShipmentLogWhereInput[];
    OR?: Prisma.ShipmentLogWhereInput[];
    NOT?: Prisma.ShipmentLogWhereInput | Prisma.ShipmentLogWhereInput[];
    id?: Prisma.StringFilter<"ShipmentLog"> | string;
    shipmentId?: Prisma.StringFilter<"ShipmentLog"> | string;
    action?: Prisma.StringFilter<"ShipmentLog"> | string;
    performedBy?: Prisma.StringFilter<"ShipmentLog"> | string;
    remarks?: Prisma.StringNullableFilter<"ShipmentLog"> | string | null;
    payload?: Prisma.JsonNullableFilter<"ShipmentLog">;
    createdAt?: Prisma.DateTimeFilter<"ShipmentLog"> | Date | string;
    shipment?: Prisma.XOR<Prisma.ShipmentScalarRelationFilter, Prisma.ShipmentWhereInput>;
};
export type ShipmentLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shipment?: Prisma.ShipmentOrderByWithRelationInput;
};
export type ShipmentLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ShipmentLogWhereInput | Prisma.ShipmentLogWhereInput[];
    OR?: Prisma.ShipmentLogWhereInput[];
    NOT?: Prisma.ShipmentLogWhereInput | Prisma.ShipmentLogWhereInput[];
    shipmentId?: Prisma.StringFilter<"ShipmentLog"> | string;
    action?: Prisma.StringFilter<"ShipmentLog"> | string;
    performedBy?: Prisma.StringFilter<"ShipmentLog"> | string;
    remarks?: Prisma.StringNullableFilter<"ShipmentLog"> | string | null;
    payload?: Prisma.JsonNullableFilter<"ShipmentLog">;
    createdAt?: Prisma.DateTimeFilter<"ShipmentLog"> | Date | string;
    shipment?: Prisma.XOR<Prisma.ShipmentScalarRelationFilter, Prisma.ShipmentWhereInput>;
}, "id">;
export type ShipmentLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    payload?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShipmentLogCountOrderByAggregateInput;
    _max?: Prisma.ShipmentLogMaxOrderByAggregateInput;
    _min?: Prisma.ShipmentLogMinOrderByAggregateInput;
};
export type ShipmentLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShipmentLogScalarWhereWithAggregatesInput | Prisma.ShipmentLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShipmentLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShipmentLogScalarWhereWithAggregatesInput | Prisma.ShipmentLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ShipmentLog"> | string;
    shipmentId?: Prisma.StringWithAggregatesFilter<"ShipmentLog"> | string;
    action?: Prisma.StringWithAggregatesFilter<"ShipmentLog"> | string;
    performedBy?: Prisma.StringWithAggregatesFilter<"ShipmentLog"> | string;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"ShipmentLog"> | string | null;
    payload?: Prisma.JsonNullableWithAggregatesFilter<"ShipmentLog">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShipmentLog"> | Date | string;
};
export type ShipmentLogCreateInput = {
    id?: string;
    action: string;
    performedBy?: string;
    remarks?: string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    shipment: Prisma.ShipmentCreateNestedOneWithoutLogsInput;
};
export type ShipmentLogUncheckedCreateInput = {
    id?: string;
    shipmentId: string;
    action: string;
    performedBy?: string;
    remarks?: string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ShipmentLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipment?: Prisma.ShipmentUpdateOneRequiredWithoutLogsNestedInput;
};
export type ShipmentLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentLogCreateManyInput = {
    id?: string;
    shipmentId: string;
    action: string;
    performedBy?: string;
    remarks?: string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ShipmentLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentLogListRelationFilter = {
    every?: Prisma.ShipmentLogWhereInput;
    some?: Prisma.ShipmentLogWhereInput;
    none?: Prisma.ShipmentLogWhereInput;
};
export type ShipmentLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShipmentLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    payload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    performedBy?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentLogCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.ShipmentLogCreateWithoutShipmentInput, Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentLogCreateWithoutShipmentInput[] | Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput | Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.ShipmentLogCreateManyShipmentInputEnvelope;
    connect?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
};
export type ShipmentLogUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.ShipmentLogCreateWithoutShipmentInput, Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentLogCreateWithoutShipmentInput[] | Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput | Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.ShipmentLogCreateManyShipmentInputEnvelope;
    connect?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
};
export type ShipmentLogUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentLogCreateWithoutShipmentInput, Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentLogCreateWithoutShipmentInput[] | Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput | Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.ShipmentLogUpsertWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentLogUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.ShipmentLogCreateManyShipmentInputEnvelope;
    set?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    disconnect?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    delete?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    connect?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    update?: Prisma.ShipmentLogUpdateWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentLogUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.ShipmentLogUpdateManyWithWhereWithoutShipmentInput | Prisma.ShipmentLogUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.ShipmentLogScalarWhereInput | Prisma.ShipmentLogScalarWhereInput[];
};
export type ShipmentLogUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentLogCreateWithoutShipmentInput, Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentLogCreateWithoutShipmentInput[] | Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput | Prisma.ShipmentLogCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.ShipmentLogUpsertWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentLogUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.ShipmentLogCreateManyShipmentInputEnvelope;
    set?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    disconnect?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    delete?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    connect?: Prisma.ShipmentLogWhereUniqueInput | Prisma.ShipmentLogWhereUniqueInput[];
    update?: Prisma.ShipmentLogUpdateWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentLogUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.ShipmentLogUpdateManyWithWhereWithoutShipmentInput | Prisma.ShipmentLogUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.ShipmentLogScalarWhereInput | Prisma.ShipmentLogScalarWhereInput[];
};
export type ShipmentLogCreateWithoutShipmentInput = {
    id?: string;
    action: string;
    performedBy?: string;
    remarks?: string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ShipmentLogUncheckedCreateWithoutShipmentInput = {
    id?: string;
    action: string;
    performedBy?: string;
    remarks?: string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ShipmentLogCreateOrConnectWithoutShipmentInput = {
    where: Prisma.ShipmentLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentLogCreateWithoutShipmentInput, Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput>;
};
export type ShipmentLogCreateManyShipmentInputEnvelope = {
    data: Prisma.ShipmentLogCreateManyShipmentInput | Prisma.ShipmentLogCreateManyShipmentInput[];
    skipDuplicates?: boolean;
};
export type ShipmentLogUpsertWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.ShipmentLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShipmentLogUpdateWithoutShipmentInput, Prisma.ShipmentLogUncheckedUpdateWithoutShipmentInput>;
    create: Prisma.XOR<Prisma.ShipmentLogCreateWithoutShipmentInput, Prisma.ShipmentLogUncheckedCreateWithoutShipmentInput>;
};
export type ShipmentLogUpdateWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.ShipmentLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShipmentLogUpdateWithoutShipmentInput, Prisma.ShipmentLogUncheckedUpdateWithoutShipmentInput>;
};
export type ShipmentLogUpdateManyWithWhereWithoutShipmentInput = {
    where: Prisma.ShipmentLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ShipmentLogUpdateManyMutationInput, Prisma.ShipmentLogUncheckedUpdateManyWithoutShipmentInput>;
};
export type ShipmentLogScalarWhereInput = {
    AND?: Prisma.ShipmentLogScalarWhereInput | Prisma.ShipmentLogScalarWhereInput[];
    OR?: Prisma.ShipmentLogScalarWhereInput[];
    NOT?: Prisma.ShipmentLogScalarWhereInput | Prisma.ShipmentLogScalarWhereInput[];
    id?: Prisma.StringFilter<"ShipmentLog"> | string;
    shipmentId?: Prisma.StringFilter<"ShipmentLog"> | string;
    action?: Prisma.StringFilter<"ShipmentLog"> | string;
    performedBy?: Prisma.StringFilter<"ShipmentLog"> | string;
    remarks?: Prisma.StringNullableFilter<"ShipmentLog"> | string | null;
    payload?: Prisma.JsonNullableFilter<"ShipmentLog">;
    createdAt?: Prisma.DateTimeFilter<"ShipmentLog"> | Date | string;
};
export type ShipmentLogCreateManyShipmentInput = {
    id?: string;
    action: string;
    performedBy?: string;
    remarks?: string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ShipmentLogUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentLogUncheckedUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentLogUncheckedUpdateManyWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    performedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    payload?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    action?: boolean;
    performedBy?: boolean;
    remarks?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentLog"]>;
export type ShipmentLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    action?: boolean;
    performedBy?: boolean;
    remarks?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentLog"]>;
export type ShipmentLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    action?: boolean;
    performedBy?: boolean;
    remarks?: boolean;
    payload?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentLog"]>;
export type ShipmentLogSelectScalar = {
    id?: boolean;
    shipmentId?: boolean;
    action?: boolean;
    performedBy?: boolean;
    remarks?: boolean;
    payload?: boolean;
    createdAt?: boolean;
};
export type ShipmentLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shipmentId" | "action" | "performedBy" | "remarks" | "payload" | "createdAt", ExtArgs["result"]["shipmentLog"]>;
export type ShipmentLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
};
export type ShipmentLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
};
export type ShipmentLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
};
export type $ShipmentLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShipmentLog";
    objects: {
        shipment: Prisma.$ShipmentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shipmentId: string;
        action: string;
        performedBy: string;
        remarks: string | null;
        payload: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["shipmentLog"]>;
    composites: {};
};
export type ShipmentLogGetPayload<S extends boolean | null | undefined | ShipmentLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload, S>;
export type ShipmentLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShipmentLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShipmentLogCountAggregateInputType | true;
};
export interface ShipmentLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShipmentLog'];
        meta: {
            name: 'ShipmentLog';
        };
    };
    findUnique<T extends ShipmentLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ShipmentLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShipmentLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShipmentLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShipmentLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ShipmentLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShipmentLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShipmentLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShipmentLogFindManyArgs>(args?: Prisma.SelectSubset<T, ShipmentLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShipmentLogCreateArgs>(args: Prisma.SelectSubset<T, ShipmentLogCreateArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShipmentLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ShipmentLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShipmentLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShipmentLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShipmentLogDeleteArgs>(args: Prisma.SelectSubset<T, ShipmentLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShipmentLogUpdateArgs>(args: Prisma.SelectSubset<T, ShipmentLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShipmentLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShipmentLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShipmentLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ShipmentLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShipmentLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShipmentLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShipmentLogUpsertArgs>(args: Prisma.SelectSubset<T, ShipmentLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ShipmentLogClient<runtime.Types.Result.GetResult<Prisma.$ShipmentLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShipmentLogCountArgs>(args?: Prisma.Subset<T, ShipmentLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShipmentLogCountAggregateOutputType> : number>;
    aggregate<T extends ShipmentLogAggregateArgs>(args: Prisma.Subset<T, ShipmentLogAggregateArgs>): Prisma.PrismaPromise<GetShipmentLogAggregateType<T>>;
    groupBy<T extends ShipmentLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShipmentLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ShipmentLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShipmentLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShipmentLogFieldRefs;
}
export interface Prisma__ShipmentLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shipment<T extends Prisma.ShipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__ShipmentClient<runtime.Types.Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShipmentLogFieldRefs {
    readonly id: Prisma.FieldRef<"ShipmentLog", 'String'>;
    readonly shipmentId: Prisma.FieldRef<"ShipmentLog", 'String'>;
    readonly action: Prisma.FieldRef<"ShipmentLog", 'String'>;
    readonly performedBy: Prisma.FieldRef<"ShipmentLog", 'String'>;
    readonly remarks: Prisma.FieldRef<"ShipmentLog", 'String'>;
    readonly payload: Prisma.FieldRef<"ShipmentLog", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"ShipmentLog", 'DateTime'>;
}
export type ShipmentLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where: Prisma.ShipmentLogWhereUniqueInput;
};
export type ShipmentLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where: Prisma.ShipmentLogWhereUniqueInput;
};
export type ShipmentLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where?: Prisma.ShipmentLogWhereInput;
    orderBy?: Prisma.ShipmentLogOrderByWithRelationInput | Prisma.ShipmentLogOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentLogScalarFieldEnum | Prisma.ShipmentLogScalarFieldEnum[];
};
export type ShipmentLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where?: Prisma.ShipmentLogWhereInput;
    orderBy?: Prisma.ShipmentLogOrderByWithRelationInput | Prisma.ShipmentLogOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentLogScalarFieldEnum | Prisma.ShipmentLogScalarFieldEnum[];
};
export type ShipmentLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where?: Prisma.ShipmentLogWhereInput;
    orderBy?: Prisma.ShipmentLogOrderByWithRelationInput | Prisma.ShipmentLogOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentLogScalarFieldEnum | Prisma.ShipmentLogScalarFieldEnum[];
};
export type ShipmentLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentLogCreateInput, Prisma.ShipmentLogUncheckedCreateInput>;
};
export type ShipmentLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShipmentLogCreateManyInput | Prisma.ShipmentLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShipmentLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    data: Prisma.ShipmentLogCreateManyInput | Prisma.ShipmentLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShipmentLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShipmentLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentLogUpdateInput, Prisma.ShipmentLogUncheckedUpdateInput>;
    where: Prisma.ShipmentLogWhereUniqueInput;
};
export type ShipmentLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShipmentLogUpdateManyMutationInput, Prisma.ShipmentLogUncheckedUpdateManyInput>;
    where?: Prisma.ShipmentLogWhereInput;
    limit?: number;
};
export type ShipmentLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentLogUpdateManyMutationInput, Prisma.ShipmentLogUncheckedUpdateManyInput>;
    where?: Prisma.ShipmentLogWhereInput;
    limit?: number;
    include?: Prisma.ShipmentLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShipmentLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where: Prisma.ShipmentLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentLogCreateInput, Prisma.ShipmentLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShipmentLogUpdateInput, Prisma.ShipmentLogUncheckedUpdateInput>;
};
export type ShipmentLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
    where: Prisma.ShipmentLogWhereUniqueInput;
};
export type ShipmentLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentLogWhereInput;
    limit?: number;
};
export type ShipmentLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentLogSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentLogOmit<ExtArgs> | null;
    include?: Prisma.ShipmentLogInclude<ExtArgs> | null;
};

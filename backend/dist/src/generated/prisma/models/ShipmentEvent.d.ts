import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ShipmentEventModel = runtime.Types.Result.DefaultSelection<Prisma.$ShipmentEventPayload>;
export type AggregateShipmentEvent = {
    _count: ShipmentEventCountAggregateOutputType | null;
    _avg: ShipmentEventAvgAggregateOutputType | null;
    _sum: ShipmentEventSumAggregateOutputType | null;
    _min: ShipmentEventMinAggregateOutputType | null;
    _max: ShipmentEventMaxAggregateOutputType | null;
};
export type ShipmentEventAvgAggregateOutputType = {
    statusCode: number | null;
};
export type ShipmentEventSumAggregateOutputType = {
    statusCode: number | null;
};
export type ShipmentEventMinAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    status: string | null;
    statusCode: number | null;
    activity: string | null;
    location: string | null;
    eventTimestamp: Date | null;
    rawPayload: string | null;
    createdAt: Date | null;
};
export type ShipmentEventMaxAggregateOutputType = {
    id: string | null;
    shipmentId: string | null;
    status: string | null;
    statusCode: number | null;
    activity: string | null;
    location: string | null;
    eventTimestamp: Date | null;
    rawPayload: string | null;
    createdAt: Date | null;
};
export type ShipmentEventCountAggregateOutputType = {
    id: number;
    shipmentId: number;
    status: number;
    statusCode: number;
    activity: number;
    location: number;
    eventTimestamp: number;
    rawPayload: number;
    createdAt: number;
    _all: number;
};
export type ShipmentEventAvgAggregateInputType = {
    statusCode?: true;
};
export type ShipmentEventSumAggregateInputType = {
    statusCode?: true;
};
export type ShipmentEventMinAggregateInputType = {
    id?: true;
    shipmentId?: true;
    status?: true;
    statusCode?: true;
    activity?: true;
    location?: true;
    eventTimestamp?: true;
    rawPayload?: true;
    createdAt?: true;
};
export type ShipmentEventMaxAggregateInputType = {
    id?: true;
    shipmentId?: true;
    status?: true;
    statusCode?: true;
    activity?: true;
    location?: true;
    eventTimestamp?: true;
    rawPayload?: true;
    createdAt?: true;
};
export type ShipmentEventCountAggregateInputType = {
    id?: true;
    shipmentId?: true;
    status?: true;
    statusCode?: true;
    activity?: true;
    location?: true;
    eventTimestamp?: true;
    rawPayload?: true;
    createdAt?: true;
    _all?: true;
};
export type ShipmentEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentEventWhereInput;
    orderBy?: Prisma.ShipmentEventOrderByWithRelationInput | Prisma.ShipmentEventOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ShipmentEventCountAggregateInputType;
    _avg?: ShipmentEventAvgAggregateInputType;
    _sum?: ShipmentEventSumAggregateInputType;
    _min?: ShipmentEventMinAggregateInputType;
    _max?: ShipmentEventMaxAggregateInputType;
};
export type GetShipmentEventAggregateType<T extends ShipmentEventAggregateArgs> = {
    [P in keyof T & keyof AggregateShipmentEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShipmentEvent[P]> : Prisma.GetScalarType<T[P], AggregateShipmentEvent[P]>;
};
export type ShipmentEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentEventWhereInput;
    orderBy?: Prisma.ShipmentEventOrderByWithAggregationInput | Prisma.ShipmentEventOrderByWithAggregationInput[];
    by: Prisma.ShipmentEventScalarFieldEnum[] | Prisma.ShipmentEventScalarFieldEnum;
    having?: Prisma.ShipmentEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShipmentEventCountAggregateInputType | true;
    _avg?: ShipmentEventAvgAggregateInputType;
    _sum?: ShipmentEventSumAggregateInputType;
    _min?: ShipmentEventMinAggregateInputType;
    _max?: ShipmentEventMaxAggregateInputType;
};
export type ShipmentEventGroupByOutputType = {
    id: string;
    shipmentId: string;
    status: string;
    statusCode: number | null;
    activity: string;
    location: string | null;
    eventTimestamp: Date;
    rawPayload: string | null;
    createdAt: Date;
    _count: ShipmentEventCountAggregateOutputType | null;
    _avg: ShipmentEventAvgAggregateOutputType | null;
    _sum: ShipmentEventSumAggregateOutputType | null;
    _min: ShipmentEventMinAggregateOutputType | null;
    _max: ShipmentEventMaxAggregateOutputType | null;
};
export type GetShipmentEventGroupByPayload<T extends ShipmentEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShipmentEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShipmentEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShipmentEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShipmentEventGroupByOutputType[P]>;
}>>;
export type ShipmentEventWhereInput = {
    AND?: Prisma.ShipmentEventWhereInput | Prisma.ShipmentEventWhereInput[];
    OR?: Prisma.ShipmentEventWhereInput[];
    NOT?: Prisma.ShipmentEventWhereInput | Prisma.ShipmentEventWhereInput[];
    id?: Prisma.StringFilter<"ShipmentEvent"> | string;
    shipmentId?: Prisma.StringFilter<"ShipmentEvent"> | string;
    status?: Prisma.StringFilter<"ShipmentEvent"> | string;
    statusCode?: Prisma.IntNullableFilter<"ShipmentEvent"> | number | null;
    activity?: Prisma.StringFilter<"ShipmentEvent"> | string;
    location?: Prisma.StringNullableFilter<"ShipmentEvent"> | string | null;
    eventTimestamp?: Prisma.DateTimeFilter<"ShipmentEvent"> | Date | string;
    rawPayload?: Prisma.StringNullableFilter<"ShipmentEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShipmentEvent"> | Date | string;
    shipment?: Prisma.XOR<Prisma.ShipmentScalarRelationFilter, Prisma.ShipmentWhereInput>;
};
export type ShipmentEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventTimestamp?: Prisma.SortOrder;
    rawPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    shipment?: Prisma.ShipmentOrderByWithRelationInput;
};
export type ShipmentEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ShipmentEventWhereInput | Prisma.ShipmentEventWhereInput[];
    OR?: Prisma.ShipmentEventWhereInput[];
    NOT?: Prisma.ShipmentEventWhereInput | Prisma.ShipmentEventWhereInput[];
    shipmentId?: Prisma.StringFilter<"ShipmentEvent"> | string;
    status?: Prisma.StringFilter<"ShipmentEvent"> | string;
    statusCode?: Prisma.IntNullableFilter<"ShipmentEvent"> | number | null;
    activity?: Prisma.StringFilter<"ShipmentEvent"> | string;
    location?: Prisma.StringNullableFilter<"ShipmentEvent"> | string | null;
    eventTimestamp?: Prisma.DateTimeFilter<"ShipmentEvent"> | Date | string;
    rawPayload?: Prisma.StringNullableFilter<"ShipmentEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShipmentEvent"> | Date | string;
    shipment?: Prisma.XOR<Prisma.ShipmentScalarRelationFilter, Prisma.ShipmentWhereInput>;
}, "id">;
export type ShipmentEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    eventTimestamp?: Prisma.SortOrder;
    rawPayload?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShipmentEventCountOrderByAggregateInput;
    _avg?: Prisma.ShipmentEventAvgOrderByAggregateInput;
    _max?: Prisma.ShipmentEventMaxOrderByAggregateInput;
    _min?: Prisma.ShipmentEventMinOrderByAggregateInput;
    _sum?: Prisma.ShipmentEventSumOrderByAggregateInput;
};
export type ShipmentEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShipmentEventScalarWhereWithAggregatesInput | Prisma.ShipmentEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShipmentEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShipmentEventScalarWhereWithAggregatesInput | Prisma.ShipmentEventScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ShipmentEvent"> | string;
    shipmentId?: Prisma.StringWithAggregatesFilter<"ShipmentEvent"> | string;
    status?: Prisma.StringWithAggregatesFilter<"ShipmentEvent"> | string;
    statusCode?: Prisma.IntNullableWithAggregatesFilter<"ShipmentEvent"> | number | null;
    activity?: Prisma.StringWithAggregatesFilter<"ShipmentEvent"> | string;
    location?: Prisma.StringNullableWithAggregatesFilter<"ShipmentEvent"> | string | null;
    eventTimestamp?: Prisma.DateTimeWithAggregatesFilter<"ShipmentEvent"> | Date | string;
    rawPayload?: Prisma.StringNullableWithAggregatesFilter<"ShipmentEvent"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShipmentEvent"> | Date | string;
};
export type ShipmentEventCreateInput = {
    id?: string;
    status: string;
    statusCode?: number | null;
    activity: string;
    location?: string | null;
    eventTimestamp: Date | string;
    rawPayload?: string | null;
    createdAt?: Date | string;
    shipment: Prisma.ShipmentCreateNestedOneWithoutEventsInput;
};
export type ShipmentEventUncheckedCreateInput = {
    id?: string;
    shipmentId: string;
    status: string;
    statusCode?: number | null;
    activity: string;
    location?: string | null;
    eventTimestamp: Date | string;
    rawPayload?: string | null;
    createdAt?: Date | string;
};
export type ShipmentEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shipment?: Prisma.ShipmentUpdateOneRequiredWithoutEventsNestedInput;
};
export type ShipmentEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentEventCreateManyInput = {
    id?: string;
    shipmentId: string;
    status: string;
    statusCode?: number | null;
    activity: string;
    location?: string | null;
    eventTimestamp: Date | string;
    rawPayload?: string | null;
    createdAt?: Date | string;
};
export type ShipmentEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    shipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentEventListRelationFilter = {
    every?: Prisma.ShipmentEventWhereInput;
    some?: Prisma.ShipmentEventWhereInput;
    none?: Prisma.ShipmentEventWhereInput;
};
export type ShipmentEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShipmentEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    eventTimestamp?: Prisma.SortOrder;
    rawPayload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentEventAvgOrderByAggregateInput = {
    statusCode?: Prisma.SortOrder;
};
export type ShipmentEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    eventTimestamp?: Prisma.SortOrder;
    rawPayload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    shipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    eventTimestamp?: Prisma.SortOrder;
    rawPayload?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShipmentEventSumOrderByAggregateInput = {
    statusCode?: Prisma.SortOrder;
};
export type ShipmentEventCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.ShipmentEventCreateWithoutShipmentInput, Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentEventCreateWithoutShipmentInput[] | Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput | Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.ShipmentEventCreateManyShipmentInputEnvelope;
    connect?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
};
export type ShipmentEventUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: Prisma.XOR<Prisma.ShipmentEventCreateWithoutShipmentInput, Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentEventCreateWithoutShipmentInput[] | Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput | Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput[];
    createMany?: Prisma.ShipmentEventCreateManyShipmentInputEnvelope;
    connect?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
};
export type ShipmentEventUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentEventCreateWithoutShipmentInput, Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentEventCreateWithoutShipmentInput[] | Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput | Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.ShipmentEventUpsertWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentEventUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.ShipmentEventCreateManyShipmentInputEnvelope;
    set?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    disconnect?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    delete?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    connect?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    update?: Prisma.ShipmentEventUpdateWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentEventUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.ShipmentEventUpdateManyWithWhereWithoutShipmentInput | Prisma.ShipmentEventUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.ShipmentEventScalarWhereInput | Prisma.ShipmentEventScalarWhereInput[];
};
export type ShipmentEventUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: Prisma.XOR<Prisma.ShipmentEventCreateWithoutShipmentInput, Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput> | Prisma.ShipmentEventCreateWithoutShipmentInput[] | Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput[];
    connectOrCreate?: Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput | Prisma.ShipmentEventCreateOrConnectWithoutShipmentInput[];
    upsert?: Prisma.ShipmentEventUpsertWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentEventUpsertWithWhereUniqueWithoutShipmentInput[];
    createMany?: Prisma.ShipmentEventCreateManyShipmentInputEnvelope;
    set?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    disconnect?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    delete?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    connect?: Prisma.ShipmentEventWhereUniqueInput | Prisma.ShipmentEventWhereUniqueInput[];
    update?: Prisma.ShipmentEventUpdateWithWhereUniqueWithoutShipmentInput | Prisma.ShipmentEventUpdateWithWhereUniqueWithoutShipmentInput[];
    updateMany?: Prisma.ShipmentEventUpdateManyWithWhereWithoutShipmentInput | Prisma.ShipmentEventUpdateManyWithWhereWithoutShipmentInput[];
    deleteMany?: Prisma.ShipmentEventScalarWhereInput | Prisma.ShipmentEventScalarWhereInput[];
};
export type ShipmentEventCreateWithoutShipmentInput = {
    id?: string;
    status: string;
    statusCode?: number | null;
    activity: string;
    location?: string | null;
    eventTimestamp: Date | string;
    rawPayload?: string | null;
    createdAt?: Date | string;
};
export type ShipmentEventUncheckedCreateWithoutShipmentInput = {
    id?: string;
    status: string;
    statusCode?: number | null;
    activity: string;
    location?: string | null;
    eventTimestamp: Date | string;
    rawPayload?: string | null;
    createdAt?: Date | string;
};
export type ShipmentEventCreateOrConnectWithoutShipmentInput = {
    where: Prisma.ShipmentEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentEventCreateWithoutShipmentInput, Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput>;
};
export type ShipmentEventCreateManyShipmentInputEnvelope = {
    data: Prisma.ShipmentEventCreateManyShipmentInput | Prisma.ShipmentEventCreateManyShipmentInput[];
    skipDuplicates?: boolean;
};
export type ShipmentEventUpsertWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.ShipmentEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShipmentEventUpdateWithoutShipmentInput, Prisma.ShipmentEventUncheckedUpdateWithoutShipmentInput>;
    create: Prisma.XOR<Prisma.ShipmentEventCreateWithoutShipmentInput, Prisma.ShipmentEventUncheckedCreateWithoutShipmentInput>;
};
export type ShipmentEventUpdateWithWhereUniqueWithoutShipmentInput = {
    where: Prisma.ShipmentEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShipmentEventUpdateWithoutShipmentInput, Prisma.ShipmentEventUncheckedUpdateWithoutShipmentInput>;
};
export type ShipmentEventUpdateManyWithWhereWithoutShipmentInput = {
    where: Prisma.ShipmentEventScalarWhereInput;
    data: Prisma.XOR<Prisma.ShipmentEventUpdateManyMutationInput, Prisma.ShipmentEventUncheckedUpdateManyWithoutShipmentInput>;
};
export type ShipmentEventScalarWhereInput = {
    AND?: Prisma.ShipmentEventScalarWhereInput | Prisma.ShipmentEventScalarWhereInput[];
    OR?: Prisma.ShipmentEventScalarWhereInput[];
    NOT?: Prisma.ShipmentEventScalarWhereInput | Prisma.ShipmentEventScalarWhereInput[];
    id?: Prisma.StringFilter<"ShipmentEvent"> | string;
    shipmentId?: Prisma.StringFilter<"ShipmentEvent"> | string;
    status?: Prisma.StringFilter<"ShipmentEvent"> | string;
    statusCode?: Prisma.IntNullableFilter<"ShipmentEvent"> | number | null;
    activity?: Prisma.StringFilter<"ShipmentEvent"> | string;
    location?: Prisma.StringNullableFilter<"ShipmentEvent"> | string | null;
    eventTimestamp?: Prisma.DateTimeFilter<"ShipmentEvent"> | Date | string;
    rawPayload?: Prisma.StringNullableFilter<"ShipmentEvent"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ShipmentEvent"> | Date | string;
};
export type ShipmentEventCreateManyShipmentInput = {
    id?: string;
    status: string;
    statusCode?: number | null;
    activity: string;
    location?: string | null;
    eventTimestamp: Date | string;
    rawPayload?: string | null;
    createdAt?: Date | string;
};
export type ShipmentEventUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentEventUncheckedUpdateWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentEventUncheckedUpdateManyWithoutShipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    eventTimestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rawPayload?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShipmentEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    status?: boolean;
    statusCode?: boolean;
    activity?: boolean;
    location?: boolean;
    eventTimestamp?: boolean;
    rawPayload?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentEvent"]>;
export type ShipmentEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    status?: boolean;
    statusCode?: boolean;
    activity?: boolean;
    location?: boolean;
    eventTimestamp?: boolean;
    rawPayload?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentEvent"]>;
export type ShipmentEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    shipmentId?: boolean;
    status?: boolean;
    statusCode?: boolean;
    activity?: boolean;
    location?: boolean;
    eventTimestamp?: boolean;
    rawPayload?: boolean;
    createdAt?: boolean;
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["shipmentEvent"]>;
export type ShipmentEventSelectScalar = {
    id?: boolean;
    shipmentId?: boolean;
    status?: boolean;
    statusCode?: boolean;
    activity?: boolean;
    location?: boolean;
    eventTimestamp?: boolean;
    rawPayload?: boolean;
    createdAt?: boolean;
};
export type ShipmentEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "shipmentId" | "status" | "statusCode" | "activity" | "location" | "eventTimestamp" | "rawPayload" | "createdAt", ExtArgs["result"]["shipmentEvent"]>;
export type ShipmentEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
};
export type ShipmentEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
};
export type ShipmentEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shipment?: boolean | Prisma.ShipmentDefaultArgs<ExtArgs>;
};
export type $ShipmentEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShipmentEvent";
    objects: {
        shipment: Prisma.$ShipmentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        shipmentId: string;
        status: string;
        statusCode: number | null;
        activity: string;
        location: string | null;
        eventTimestamp: Date;
        rawPayload: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["shipmentEvent"]>;
    composites: {};
};
export type ShipmentEventGetPayload<S extends boolean | null | undefined | ShipmentEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload, S>;
export type ShipmentEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShipmentEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShipmentEventCountAggregateInputType | true;
};
export interface ShipmentEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShipmentEvent'];
        meta: {
            name: 'ShipmentEvent';
        };
    };
    findUnique<T extends ShipmentEventFindUniqueArgs>(args: Prisma.SelectSubset<T, ShipmentEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ShipmentEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShipmentEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ShipmentEventFindFirstArgs>(args?: Prisma.SelectSubset<T, ShipmentEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ShipmentEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShipmentEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ShipmentEventFindManyArgs>(args?: Prisma.SelectSubset<T, ShipmentEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ShipmentEventCreateArgs>(args: Prisma.SelectSubset<T, ShipmentEventCreateArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ShipmentEventCreateManyArgs>(args?: Prisma.SelectSubset<T, ShipmentEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ShipmentEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShipmentEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ShipmentEventDeleteArgs>(args: Prisma.SelectSubset<T, ShipmentEventDeleteArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ShipmentEventUpdateArgs>(args: Prisma.SelectSubset<T, ShipmentEventUpdateArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ShipmentEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShipmentEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ShipmentEventUpdateManyArgs>(args: Prisma.SelectSubset<T, ShipmentEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ShipmentEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShipmentEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ShipmentEventUpsertArgs>(args: Prisma.SelectSubset<T, ShipmentEventUpsertArgs<ExtArgs>>): Prisma.Prisma__ShipmentEventClient<runtime.Types.Result.GetResult<Prisma.$ShipmentEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ShipmentEventCountArgs>(args?: Prisma.Subset<T, ShipmentEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShipmentEventCountAggregateOutputType> : number>;
    aggregate<T extends ShipmentEventAggregateArgs>(args: Prisma.Subset<T, ShipmentEventAggregateArgs>): Prisma.PrismaPromise<GetShipmentEventAggregateType<T>>;
    groupBy<T extends ShipmentEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShipmentEventGroupByArgs['orderBy'];
    } : {
        orderBy?: ShipmentEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShipmentEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ShipmentEventFieldRefs;
}
export interface Prisma__ShipmentEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    shipment<T extends Prisma.ShipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__ShipmentClient<runtime.Types.Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ShipmentEventFieldRefs {
    readonly id: Prisma.FieldRef<"ShipmentEvent", 'String'>;
    readonly shipmentId: Prisma.FieldRef<"ShipmentEvent", 'String'>;
    readonly status: Prisma.FieldRef<"ShipmentEvent", 'String'>;
    readonly statusCode: Prisma.FieldRef<"ShipmentEvent", 'Int'>;
    readonly activity: Prisma.FieldRef<"ShipmentEvent", 'String'>;
    readonly location: Prisma.FieldRef<"ShipmentEvent", 'String'>;
    readonly eventTimestamp: Prisma.FieldRef<"ShipmentEvent", 'DateTime'>;
    readonly rawPayload: Prisma.FieldRef<"ShipmentEvent", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ShipmentEvent", 'DateTime'>;
}
export type ShipmentEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where: Prisma.ShipmentEventWhereUniqueInput;
};
export type ShipmentEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where: Prisma.ShipmentEventWhereUniqueInput;
};
export type ShipmentEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where?: Prisma.ShipmentEventWhereInput;
    orderBy?: Prisma.ShipmentEventOrderByWithRelationInput | Prisma.ShipmentEventOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentEventScalarFieldEnum | Prisma.ShipmentEventScalarFieldEnum[];
};
export type ShipmentEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where?: Prisma.ShipmentEventWhereInput;
    orderBy?: Prisma.ShipmentEventOrderByWithRelationInput | Prisma.ShipmentEventOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentEventScalarFieldEnum | Prisma.ShipmentEventScalarFieldEnum[];
};
export type ShipmentEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where?: Prisma.ShipmentEventWhereInput;
    orderBy?: Prisma.ShipmentEventOrderByWithRelationInput | Prisma.ShipmentEventOrderByWithRelationInput[];
    cursor?: Prisma.ShipmentEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShipmentEventScalarFieldEnum | Prisma.ShipmentEventScalarFieldEnum[];
};
export type ShipmentEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentEventCreateInput, Prisma.ShipmentEventUncheckedCreateInput>;
};
export type ShipmentEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ShipmentEventCreateManyInput | Prisma.ShipmentEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ShipmentEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    data: Prisma.ShipmentEventCreateManyInput | Prisma.ShipmentEventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ShipmentEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ShipmentEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentEventUpdateInput, Prisma.ShipmentEventUncheckedUpdateInput>;
    where: Prisma.ShipmentEventWhereUniqueInput;
};
export type ShipmentEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ShipmentEventUpdateManyMutationInput, Prisma.ShipmentEventUncheckedUpdateManyInput>;
    where?: Prisma.ShipmentEventWhereInput;
    limit?: number;
};
export type ShipmentEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ShipmentEventUpdateManyMutationInput, Prisma.ShipmentEventUncheckedUpdateManyInput>;
    where?: Prisma.ShipmentEventWhereInput;
    limit?: number;
    include?: Prisma.ShipmentEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ShipmentEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where: Prisma.ShipmentEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShipmentEventCreateInput, Prisma.ShipmentEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ShipmentEventUpdateInput, Prisma.ShipmentEventUncheckedUpdateInput>;
};
export type ShipmentEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
    where: Prisma.ShipmentEventWhereUniqueInput;
};
export type ShipmentEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShipmentEventWhereInput;
    limit?: number;
};
export type ShipmentEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ShipmentEventSelect<ExtArgs> | null;
    omit?: Prisma.ShipmentEventOmit<ExtArgs> | null;
    include?: Prisma.ShipmentEventInclude<ExtArgs> | null;
};

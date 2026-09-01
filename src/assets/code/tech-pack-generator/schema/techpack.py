# Output is validated before it can reach a factory. Malformed extraction
# fails here rather than turning up in a production file.

class StitchRow(BaseModel):
    stitch_type: str
    seam_type: str
    area: str
    stitch_image: str
    thread_type: int
    thread_color: str

class BOMitem(BaseModel):
    item_name: str
    item_color: str
    item_image: str
    quantity: int
    unit: str

class Fabric(BaseModel):
    fabric_name: str
    fabric_color: str
    fabric_image: str

class TechPackAnalysis(BaseModel):
    stitch_table: List[StitchRow]
    bom: List[BOMitem]
    fabrics: List[Fabric]

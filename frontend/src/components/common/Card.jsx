const Card=({name,price})=>{
    return(<>
        <div className="flex flex-col gap-2">
            <div>
                <img src="https://placehold.co/250x300"/>
            </div>
            <h3 className="font-bold">{name}</h3>
            <p>{price}</p>
        </div>
    </>)
}
export default Card